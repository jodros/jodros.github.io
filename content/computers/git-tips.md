---
title: "Git Tips"
date: 2023-07-21T15:47:45-03:00
draft: true
---

## Committing

### Delete commit history as a whole

Got it from *[this answer in StackOverflow](https://stackoverflow.com/a/26000395)*

- Checkout

  `git checkout --orphan latest_branch`

- Add all the files

`git add -A`

- Commit the changes

  `git commit -am "commit message"`

- Delete the branch

  `git branch -D main`

- Rename the current branch to main

  `git branch -m main`

- Finally, force update your repository

  `git push -f origin main`

- Actual cleaning up

  `git gc --aggressive --prune=all`

---

## Branching

<!-- ### Pull request -->

### Each branch having its own remote

Let us say you think it is easier to have a private branch for the development and another public for the finished releases instead of maintaining two repositories.

```sh
git remote add public <link>
git checkout -b public public/main
git fetch public/main
git push --set-upstream-to public/main public

git remote add dev <link>
git checkout main
```
