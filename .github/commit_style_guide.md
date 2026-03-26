# Custom commit messages

- All commits must be "SignOff", just use "commit -sm"
- Use imperative verbs ("Add feature" instead of "Adding feature" or "Added feature")
- First line must have a maximum of 72 characters
- Consider describing it in detail in the commit body
- Consider using an emoji at the beginning of the commit message

Emoji | Code | Commit Type
------------ | ------------- | -------------
:sparkles: | `:sparkles:` | New feature
:tada: | `:tada:` | Initial commit
:nail_care: | `:nail_care:` | Improve UI/UX
:art: | `:art:` | Improve the structure/code format
:racehorse: | `:racehorse:` | Improve performance
:ok_hand: | `:ok_hand:` | General improvements
:hammer: | `:hammer:` | Fixes and refactors
:memo: | `:memo:` | Write documentation
:bug: | `:bug:` | Fix bugs
:file_folder: | `:file_folder:` | Change folder structure
:wrench: | `:wrench:` | Change/Update project configs
:fire: | `:fire:` | Fix bugs in production (hotfix)
:green_heart: | `:green_heart:` | Fix a CI build
:white_check_mark: | `:white_check_mark:` | Add tests
:lock: | `:lock:` | Improve security
:arrow_up: | `:arrow_up:` | Update dependencies
:arrow_down: | `:arrow_down:` | Downgrade dependencies
:poop: | `:poop:` | Deprecated
:construction: | `:construction:` | Under construction
:rocket: | `:rocket:` | New version
:see_no_evil: | `:see_no_evil:` | Work around (pt-br: "Gambiarra")
:whale: | `:whale:` | Docker
:boom: | `:boom:` | Conflict merge
:scissors: | `:scissors:` | Legacy code removal
:milky_way: | `:milky_way:` | Add iamges/icons
Other | [Be creative](http://www.emoji-cheat-sheet.com/) | Other use cases

## Example

```bash
git commit -sm ":memo: Add contribution instructions"
-m "The CONTRIBUTING.md file was created with instructions on how to make a good commit"
```
