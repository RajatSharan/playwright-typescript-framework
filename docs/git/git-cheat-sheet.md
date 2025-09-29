## 1. Setup & Initialization

| Command | Description |
| :--- | :--- |
| `git init` | Initializes a **new Git repository** in the current directory. |
| `git clone <url>` | Downloads a **copy of a remote repository**. |
| `git config --global user.name "Your Name"` | Sets the **author name** for all future commits. |
| `git config --global user.email "you@example.com"` | Sets the **author email** for all future commits. |

---

## 2. Staging & Committing (The Three Trees)

| Command | Description |
| :--- | :--- |
| `git status` | Shows the state of the **working directory** and **staging area**. |
| `git add <file>` | Moves changes from the **working directory** to the **staging area** (Index). |
| `git add .` | Stages **all modified and new files**. |
| `git commit -m "Commit Message"` | Records the staged snapshot permanently to the **repository history**. |
| `git commit -am "Commit Message"` | Stages **all tracked, modified files** and commits them (skips `git add` for tracked files). |
| `git rm <file>` | Removes a file from the **working directory** and **stages the deletion**. |
| `git rm --cached <file>` | Removes a file from **Git tracking**, but keeps it in the **working directory** (unstages a file). |
| `git diff` | Shows **unstaged changes** (working directory vs. staging area). |
| `git diff --staged` | Shows **staged changes** (staging area vs. last commit). |

---

## 3. History, Logs & Undoing Changes

### Viewing History

| Command | Description |
| :--- | :--- |
| `git log` | Shows the **commit history**. |
| `git log --oneline` | Shows a **concise, single-line** history. |
| `git log --graph` | Displays the **branch and merge history** as a graph. |
| `git shortlog -sn` | Summarizes commit output, showing the **number of commits per author**. |

### Undoing (Careful with these!)

| Command | Description |
| :--- | :--- |
| `git reset --soft HEAD~1` | **Un-commits** the last commit, keeps changes **staged**. |
| `git reset --mixed HEAD~1` | **Default.** Un-commits, keeps changes in the **working directory** (unstaged). |
| `git reset --hard HEAD~1` | **DANGEROUS!** Un-commits, **discards changes** completely. |
| `git revert <commit-hash>` | Creates a **new commit** that **undoes** the specified commit. **Safer for public history.** |
| `git restore <file>` | **Discards changes** in the **working directory** for a specific file (since the last commit or staged state). |
| `git restore --staged <file>` | **Unstages** a file, moving it back to the working directory. |
| `git reflog` | Shows a **log of all operations** that modified the HEAD (a safety net for lost commits). |

---

## 4. Branching

### Core Branching Commands

| Command | Description |
| :--- | :--- |
| `git branch` | **Lists** local branches. |
| `git branch <new-branch-name>` | **Creates** a new branch. |
| `git checkout <branch-name>` | **Switches** to an existing branch. |
| `git checkout -b <new-branch>` | **Creates AND switches** to a new branch. (Shorthand for `git branch` then `git checkout`). |
| `git switch <branch-name>` | **Newer, cleaner** command for switching branches. |
| `git switch -c <new-branch>` | **Newer, cleaner** command for creating and switching. |
| `git branch -d <branch-name>` | **Deletes** a branch (only if merged). |
| `git branch -D <branch-name>` | **Force-deletes** a branch (even if unmerged). |

### Integration (Merge & Rebase)

#### Merge

| Command | Description |
| :--- | :--- |
| `git merge <branch>` | Integrates changes from the specified branch into the **current branch**. |
| `git merge --no-ff <branch>` | **Force a merge commit**, even if a fast-forward is possible (useful for maintaining a clear project history). |
| **Concept** | Adds a **new merge commit** to the history, showing the integration point. |

#### Rebase

| Command | Description |
| :--- | :--- |
| `git rebase <branch>` | Moves the starting point of the current branch to be **after** the latest commit of the specified branch. |
| `git rebase -i HEAD~N` | **Interactive rebase** for rewriting the last $N$ commits (squash, reword, edit, drop). |
| **Concept** | **Rewrites history** by re-applying commits sequentially, resulting in a **linear history** (avoids merge commits). |

#### Merge vs. Rebase Comparison (Interview Focus)

| Feature | `git merge` | `git rebase` |
| :--- | :--- | :--- |
| **History** | **Non-linear** (Keeps full context, including merge commits). | **Linear** (Cleans up history by moving the base). |
| **Safety** | **Safer**. Doesn't rewrite history. Good for public branches. | **Risky**. Rewrites history. Only use on local/private branches. |
| **Commits** | Adds a **single merge commit**. | Creates **new commits** for every re-applied commit. |

---

## 5. Remote Operations (Push, Pull, Fetch)

| Command | Description |
| :--- | :--- |
| `git remote -v` | Lists all configured **remote repositories**. |
| `git fetch` | Downloads objects and refs from the remote, but **DOES NOT merge** or modify the local working copy. |
| `git pull` | **Fetches** from the remote **AND merges** it into the current branch. (Shorthand for `git fetch` + `git merge`). |
| `git push origin <branch>` | Uploads local branch commits to the remote repository (`origin`). |
| `git push -u origin <branch>` | **Sets the upstream tracking** reference for the current branch, then pushes. |
| `git push origin --delete <remote-branch>` | **Deletes a remote branch**. |

---

## 6. Advanced/Debugging Tools

| Command | Description |
| :--- | :--- |
| `git stash` | **Temporarily saves** modified, tracked files without committing, cleaning the working directory. |
| `git stash pop` | Restores the most recently stashed changes and **deletes the stash**. |
| `git stash apply` | Restores the most recently stashed changes but **keeps the stash**. |
| `git cherry-pick <commit-hash>` | **Applies a specific commit** from one branch onto the current branch, creating a new commit. |
| `git bisect start` / `good` / `bad` | Powerful tool for **finding the commit that introduced a bug** via binary search. |
| `git blame <file>` | Shows **who last modified each line** of a file and in which commit. |
| `git clean -n` | **Dry run** (shows what would be removed) of untracked files. |
| `git clean -f` | **Removes untracked files** from the working directory. |
| `git archive --format=zip HEAD -o project.zip` | **Creates a zip/tar archive** of the repository's files at a given commit/branch. |