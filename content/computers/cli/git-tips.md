---
title: "git"
draft: false
---

I'm tired of getting back to forums just to remember how to do specific stuff in `git`, so I'm gathering the steps for each thing I wish to do in this page... 


## Committing
### Delete commit history as a whole

Got it from *[this answer in StackOverflow](https://stackoverflow.com/a/26000395)*

- Checkout: `git checkout --orphan latest_branch`
- Add all the files: `git add -A`
- Commit the changes: `git commit -am "commit message"`
- Delete the branch: `git branch -D main`
- Rename the current branch to main: `git branch -m main`
- Finally, force update your repository: `git push -f origin main`
- Actual cleaning up: `git gc --aggressive --prune=all`


<!-- ## Branching -->

