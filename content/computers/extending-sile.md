---
title: "Extending SILE typesetter"
draft: false
---

<!-- This text is related to {{< static src="" text="this YouTube playlist" >}}. -->

*This page is going to be updated as new features are being released.*

Since using Microsoft Word-like programs is always a disgusting experience, I started looking for some minimalist and free-licensed alternative, I had tried LaTeX but didn't like it at all — no technical disappointing, just found it tricky. So after some time seeking for, I had just discovered {{< static src="https://github.com/sile-typesetter/sile" text="Simon's Improved Layout Engine" >}} and since I'm using it for any PDF. So why it is so better (at least for my needs) than any other way?

I know there are many simplified ways to generate pretty good PDFs like using **Pandoc**, **R MarkDown** or **Quarto**, and I had tried all of them. However, my needs are not only about text in some sheet. I was looking for a tool which could beyond that, also have absolute control over each piece of its engine, something with which I could even use as a full alternative to Adobe InDesign, Affinity Publisher or Scribus for serious desktop publishing work. This article is related to my *extend.sile* repository in GitHub.[^github]

So the first command is the `\document`[^sugar] to set the main environment:

{{< details "see simple.sil" >}}

```txt
\document{


%this is a comment
%nofolios %use this command if you want to hide page numbers

This is the simplest example of a pdf created using SILE vanilla.

}
```

{{< /details >}}

**{{< static src="pdfs/sile-examples/simple.pdf" text="See the pdf output." >}}**

So here is a more complete example:

{{< details "see single-page.sil" >}}

```txt
\document[papersize=a5]{

\use[module=packages.lorem]
\font[family=Cormorant,size=13pt]{
\lorem[words=350]}

}
```

{{< /details >}}

**{{< static src="pdfs/sile-examples/single-page.pdf" text="See the pdf output." >}}**

If you wish reproduce this example with a text neither written in English nor being a `loremipsum`, you must use the command `\language[main=]`[^lang] just below the `\document`, otherwise you're going to have trouble with hyphenation...

Note how the borders are too narrow, so how to change it? Each page is made of a set of frames, we're free to create new ones or even edit the values of the default one. That's the moment when the playing begins: SILE has a package system which allows us to overwrite any part of its source[^doc], we can gather all our changes using LuaRocks. Your `.rockspec` file should look like this:

{{< details "see package.sile-dev-1.rockspec" >}}

```lua
package = "package-name.sile"
version = "dev-1"
source = {
   url = "git+ssh://git@github.com/username/package-name.sile.git"
}
description = {
   homepage = "",
   license = "MIT"
}
dependencies = {
   "lua >= 5.1",
}
build = {
   type = "builtin",
   modules = {
      ["sile.core.sile"] = "core/sile.lua",
      ["sile.classes.plain"] = "classes/plain.lua",
      ["sile.packages.textual.init"] = "packages/textual/init.lua",
   },
   copy_directories = { "config" } -- this is going to be used further...
}
```

{{< /details >}}

As you've just saw, we can define which files we're going to overwrite or which new we're creating. Once all files are set up run `luarocks --local make`, now SILE will look at these pieces of code before looking at the original ones. In my implementation of frame sets, I created `framesets.lua` inside the `core` folder and put all them there. But by now lets change only the one in the class `plain.lua`[^plain]:

{{< details "see frameset declaration in classes/plain.lua" >}}

```lua
class.defaultFrameset = {
  content = {
    left = "15%pw",
    right = "85%pw",
    top = "15%ph",
    bottom = "top(footnotes)"
  },
  folio = {
    left = "left(content)",
    right = "right(content)",
    top = "bottom(footnotes)+2%ph",
    bottom = "97%ph"
  },
  footnotes = {
    left = "left(content)",
    right = "right(content)",
    height = "0",
    bottom = "90%ph"
  }
}
```

{{< /details >}}

**{{< static src="pdfs/sile-examples/mod-frameset.pdf" text="Now see the output pdf of the last .sil example but with new values set for the content frame." >}}**

It looks much better, isn't? But there are several other important stuff one should do when working in design of books. Each item must have its own specific value, for example text parts like chapter names, body, epigraphs and footnotes, it is not a good ideia chapters having the same font weight and size as the epigraphs and as the body and so forth. I thought it would be time-saving if all these options were declared in a single configuration file coming together with our `rock`. That's why there is a `config` directory to be copied by LuaRocks when the package is installed. What we're going to do now is get a way to parse a `toml` file and use its data in our code to automatically set every option one may need when making a long and serious-looking document.

{{< details "see a snippet of config/styles/default.toml" >}}

```toml
papersize = "a5"
folios      = true
landscape   = false
neverindent = false

[alingments]
toc             = "right"
folio           = "center"
chapter         = "left"
epigraph        = "right"
title           = "center"
author          = "center"
imprint         = "center"
editionNotice   = "center"
printingNotice  = "center"
acknowledgement = "center"

[fonts] # [family, size, weight, color]
toc       = ["Cormorant Upright",  "10pt", 400, false]
isbn      = ["Cormorant",          "11pt", 300, false]
main      = ["Cormorant Garamond", "13pt", 400, false]
title     = ["Cormorant",          "20pt", 600, false]
folio     = ["Cormorant Infant",   "11pt", 500, false]
author    = ["Cormorant",          "15pt", 700, false]
special   = ["Noto Sans JP",       "16pt", 100, false] # for characters like ▩▤▧⌘
headers   = ["Cormorant",          "10pt", 500, false]
imprint   = ["Cormorant Infant",   "16pt", 800, false]
chapters  = ["Cormorant Infant",   "18pt", 700, false]
epigraph  = ["Cormorant",          "0.9em", 500, false]
footnotes = ["Baskervville",       "0.9em", 400, false]
```

{{< /details >}}

So instead of specifying these along with the document text in the `.sil` file, we'll have to write only the content letting all this setup being declared outside it. You can check the parsing of the `toml` in `aux/super.lua` in the repo. SILE offers us a global table `SILE.scratch` to store data which may be requested by the classes and packages, so my approach was to parse it before anything else in `core/sile.lua` and then assign its data to that global table. But what if we need to change only some of these options for our local project? Well, initially I was copy-pasting the entire default.toml to my working directory so thus changing what I wish to do, but it would make much more sense if in the local `toml` were declared only those which I wish to change. The solution is the function `merge` run just after super in the main core file, it uses a recursive approach to compare each item of the local `settings.toml` for each item and/or table existing in `default.toml`.

Another addition I made is the option to change the portrait orientation to landscape, so lets rerun the same file but this time with `landscape = true` in a local `settings.toml`. I also set an option `show = true` in the test table in order to see the borders of the frames.

**{{< static src="pdfs/sile-examples/landscape.pdf" text="see the pdf output." >}}**

[^github]: You can check my code at {{< static src="https://github.com/jodros/extend.sile" text="this GitHub repository." >}}
[^sugar]: `\document{...}` is "syntactic sugar" for `\begin{document} ... \end{document}` and this works for any other command.
[^lang]: The main option must receive an ISO639-1 code.
[^doc]: {{< static src="https://sile-typesetter.org/manual/sile-0.14.10.pdf#page=38" text="SILE official documentation, page 38." >}}
[^plain]: The original table is {{< static src="https://github.com/sile-typesetter/sile/blob/83d142305846800bb5121b13f0a626e3f205dba3/classes/plain.lua#L6" text="this one.">}}
