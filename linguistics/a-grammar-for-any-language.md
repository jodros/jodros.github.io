---
title: "A \"Grammar\" for Any Language"
date: 2023-02-22T16:43:47-03:00
draft: false
---

### The case for such grammar

I had found *An Introduction to Descriptive Linguistics* by H. A. Gleason in an old-book store and began to be more interested in the subject, particularly the concept of an abstract and formal understanding of language by each one of its parts.

Learning first how each natural language works in its deeper gears, and then speeding up the learning of any of them: inversely to what some people may think, natural languages are distinguished by differences in their syntaxes and not in the lexical body. So learning a foreign language is firstly about getting how the sense is built according to its inner rules. The vocabulary and other "external" features come after that.

Take up any grammar book for any language, probably what you may see in its content is something like the following:

+ Pronouns
+ Essential verbs and their several tenses
+ Nouns and adjectives
+ Adverbs
+ Preposition and conjunctions

So since any language has these features, these same grammatical categories, it would be a good start to list every kind of word and its compounds, for example:

+ word structure
  + root
  + theme, thematic vowel
  + affixes (prefixes, suffixes, infixes...)
+ word categories
  + article
    + defined
    + undefined
  + pronoun
    + personal
    + possessive
    + demonstrative
    + relative
  + noun and adjective
    + gender
    + number
  + verb
    + time tense
    + voice
      + active
      + passive
    + number
    + transitivity
    + aspect
  + adverb
    + of time
    + of place
    + of mode
    + of negation
    + of affirmation
    + interrogative
    + of intensity
  + conjunctions
    + coordinating
      + additive
      + adversative
      + alternative (or correlative)
      + conclusive
      + explicative
    + subordinating

Of course there is much more to approach when describing a language, this is just a sketch of the idea.

#### Basic questions

+ Is it a synthetic language or an analytic one?

  The best-known examples of synthetic languages are German, Latin, Greek and Russian: the syntactic function of the words is defined by suffixation and word order does not have great importance. Whereas in analytic languages such as Portuguese, Italian and Mandarin the position of the word has a fundamental role for its right meaning. It may look a bit hard at the beginning for someone used only to the analytic ones to get who is who in a pure synthetic sentence lacking any order.

+ Does it have some relation to your mother tongue?

  It's much easier for a Russian native speaker to learn Ukrainian than for a Spanish native speaker, but on the other side, for the last, it's much easier to learn Portuguese than for the first...

#### From where to begin?

The first step is, of course, learning the invariable words and the most common ones, a great way to get such set of words is consulting a Swadesh list, you can even generate multiple lists, side-by-side, for the languages you are searching on using python {{< static src="https://www.nltk.org/" text="Natural Language Toolkit." >}} Here are two examples of what you can do with it:

+ {{< static src="pdfs/swadesh-neolatin.pdf" text="Romance languages" >}}
+ {{< static src="pdfs/swadesh-slavic.pdf" text="Slavic languages" >}}

The base script to generate such pdf is the following, you just need to change the ISO 639-1 language codes[^nltk]:

{{< details "see the code" >}}

```py

from nltk.corpus import swadesh
from tabulate import tabulate

table = {"latin": swadesh.words("la"),
         "portuguese": swadesh.words("pt"),
         "spanish": swadesh.words("es"),
         "french": swadesh.words("fr"),
         "italian": swadesh.words("it"),
         "romanian": swadesh.words("ro")}

tb = tabulate(table, headers='keys', tablefmt='grid')

with open("swadesh.md", "w") as sl:
sl.write(r'\pagenumbering{gobble}')
sl.write("\n\n")
sl.write(tb)
sl.close()

# pandoc file.md -o file.pdf

```

{{< /details >}}

### Paradigms and syntagms

The very beginning of any language is to learn how to ask and answer basic questions. We do not need to know many words to do so.

*He slowly writes a letter to her right now, at his office.*

|     Who     |     How     |       What      |   to whom  |     When    |    Where      |
|   :-----:   |   :-----:   |     :-----:     |  :-----:   |   :-----:   |   :-----:     |
|    He       |   slowly    | writes a letter |   to her   |  right now  | at his office |

*She quickly wrote a letter to him yesterday, at her home.*

|     Who     |     How     |       What      |   to whom  |     When    |    Where      |
|   :-----:   |   :-----:   |     :-----:     |  :-----:   |   :-----:   |   :-----:     |
|    She      |   quickly   |  wrote a letter |   to him   |  yesterday  |  at her home  |

*Soon someone will write a letter to them somewhere.*

|     Who     |         What        |    to whom  |     When    |     Where    |
|   :-----:   |       :-----:       |   :-----:   |   :-----:   |    :-----:   |
|   someone   | will write a letter |   for them  |     soon    |   somewhere  |

This is an example of a paradigm, the sentences have pretty similar structures, but they have different components or syntagms. We can see that, in English, the personal pronoun changes according to its position in the sentence, that is, it can be the subject or the object, and this role is expressed through morphological change, even though its gender and number remain the same. Now we could do the same as we did with word categories but in a syntactical matter, listing the possible words which can answer each one of these questions, here an example with portuguese:

I really like the analogy between our brains and computers, to think in our thought processes as they were computations, and so studying things just like we were programming: think these questions *who, what, when...* as functions, and since functions can have parameters which also can be changed over time, we can define the most abstract and general paradigm as possible.

+ Who(category, gender, person, number, role)
+ What(action, tense, person and number, aspect, transitivity, voice, mood)
+ To/for whom/what(category, gender, number, role, person, case) and so on...

Now we can rewrite the first example into a more abstract manner:

+ Who(personal pronoun, masculine, third person, singular, subject)
+ What(writing, present, third singular, simple, transitive, active, indicative)
+ To whom(personal pronoun, feminine, singular, object, third person, dative)

And regarding to *how*, *when* and *where*, they must agree according the context, one can neither use *yesterday* if the verb tense is future nor use *tomorrow* if it is past and so forth...

But how many parameters they may have? Well, it's a matter of combinatorics and I missed all math classes so I wrote a piece of code using Lua to generate some possible paradigms, the code below gives us about to `839808`, it is just a sketch so of course it may have several minor problems, but you got the idea...

{{< details "see the code" >}}

```lua
NP = {
    pronoun = {
        "demonstrative",
        "personal",
        "possessive",
        "relative",
        "indefinite",
        "negative",
    },

    number = {
        "singular",
        "plural"
    },

    gender = {
        "masculine",
        "feminine",
        "neuter"
    },

    person = {
        "first",
        "second",
        "third"
    },

    case = {
        "dative",
        "genitive",
        "nominative",
        "accusative",
        "prepositive",
        "instrumental"
    },
}

VP = {
    tense = {
        "past",
        "present",
        "future"
    },
    mood = {
        "indicative",
        "subjunctive",
        "imperative"
    },
    aspect = {
        "perfective",
        "imperfective"
    },

    voice = {
        "passive",
        "active"
    },

    person = {
        "first",
        "second",
        "third"
    },

    number = {
        "singular",
        "plural"
    },

    transitivity = {
        "intransitive",
        "transitive"
    },
}

local dot = "."

local subject, verb, object = {}, {}, {}

for _, pronoun in ipairs(NP.pronoun) do
    for _, gender in ipairs(NP.gender) do
        for _, number in ipairs(NP.number) do
            table.insert(subject, pronoun .. dot .. gender .. dot .. number)
        end
    end
end

for _, mood in ipairs(VP.mood) do
    for _, tense in ipairs(VP.tense) do
        for _, person in ipairs(VP.person) do
            for _, number in ipairs(VP.number) do
                for _, transitivity in ipairs(VP.transitivity) do
                    table.insert(verb, mood .. dot .. tense .. dot .. person .. dot .. number .. dot .. transitivity)
                end
            end
        end
    end
end

for _, pronoun in ipairs(NP.pronoun) do
    for _, gender in ipairs(NP.gender) do
        for _, number in ipairs(NP.number) do
            for _, case in ipairs(NP.case) do
                table.insert(object, pronoun .. dot .. gender .. dot .. number .. dot .. case)
            end
        end
    end
end

local count = 0

for _, subject in ipairs(subject) do
    for _, verb in ipairs(verb) do
        for _, object in ipairs(object) do
            print("\nWho: " .. subject)
            print("What: " .. verb)
            print("To/for whom/what: " .. object)
            count = count + 1
        end
    end
end

print("TOTAL: " .. count)
```

{{< /details >}}

### Learning essential words  
<!-- tough though thought through thorough throughout... -->

Maybe the biggest deal one can do in this starting point is to list all the main invariable words like adverbs, conjunctions and prepositions, grouping them by similarity:

+ Addition: also, together, among, with/without, across, over...
+ Adversative: however, even though, despite, instead, rather, instead of...
+ Question: who, why, what, when, which, where, how, how many...
+ Conditions and possibilities:
  + not .. but
  + if .. then ..
  + both .. and
  + either .. or ..
  + whether .. or
  + neither .. nor
  + not only .. but also
+ Time:
  + before ― now ― after
  + never ― sometimes ― always
  + yesterday ― today ― tomorrow
+ Place:
  + near ― far
  + here ― there
  + inside ― outside
+ Amount:
  + almost ― every
  + none ― each one
  + a part ― the whole

And then the verbs:

+ Sensorial: to listen/hear, to see, to touch, to smell, to feel...
+ Movement: to walk, to run, to swim, to fly...
+ Pairs:
  + to do ― to undo
  + to want ― can
  + to read ― to write
  + to hear ― to speak
  + to live ― to die
  + to give ― to receive
  + to allow ― to deny
  + to remember ― to forget
  + to like/love ― to dislike/hate
  + to begin/start ― to end/finish
+ Daily actions:
  + to eat and to drink
  + to work or to study
  + to wake up or to sleep

Now, regarding to the adjectives, they are maybe the category most suitable to be listed by pairs:

+ tiny ― big
+ skinny - fat
+ new ― old
+ cold ― hot
+ slow ― fast
+ easy ― hard
+ short ― long
+ rare ― common
+ straight ― curvy

So now the last but not least are the nouns. But why let them last since most words in any language are nouns? Exactly, they are the majority, but just that, there are a lot of them, indeed, the point is that vocabulary acquisition is just a matter of time once you got those fundamental principles on how sentences are made. We should now list firstly not the words but the subjects they are related to, and so add words as we remember of them.

+ Greetings
+ Time
+ Animals
+ Clothing
+ Colors
+ Countries
+ Days and months
+ Numbers
+ Directions
+ Family
+ Home
+ Food and drink
+ Health
+ Transport
+ Weather

### Creating sentences and transformations

Now, retaking the point about paradigms. We could set some rules:

+ Every noun must have an adjective.
+ Verbs must have adverbs as much as possible.
+ The object must have a different gender and number than the subject.

Why? Well, writing every time in pairs adjective-noun, adverb-verb, masculine-feminine and singular-plural would help to internalize many words at once, for example:

*They said to me that an yellow car would be near that brown house.*

So let us say you are learning english, you need to memorize the names of things, the fundamental modal adverbs, more than just one form of a personal pronoun and so forth... Then I think the fastest way to learn all those features a language may have is simply... use all of them in every single sentence you make when start to learn it!

[^nltk]: Note that this library has limitations and some languages may be not available.
