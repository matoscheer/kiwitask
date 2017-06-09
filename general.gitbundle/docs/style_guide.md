# Style guide

Basically we follow standard [PEP8 styleguide][1] (checked by Coala) and [Django coding style][2]
recommendations.

Before you start publishing your code, read both recommendations and follow 
them in your daily work please. We suggest you to install [Coala](#coala) and 
[git hook][12]
for continuous style checking.


## PEP8 highlights

* 4 space per indentation level
* Limit all lines to a maximum 99 characters (see below)
* 2 blank lines between top level functions or classes, methods inside class
  surrounded by 1 line
* UTF-8 everywhere
* Naming conventions: `ClassName`, `function_name`, `method_name`, 
  `atribute_name`, `argument_in_fucntion_or_method`, `CONSTANT` (generaly,
  most common convention is to use lowercase and underscore)
* When catching exceptions, mention specific exceptions whenever possible 
  instead of using a bare `except:` clause

[Complete documentation][1].


## Django highlights

Imports:

* We use [isort][4] in Coala (`PyImportSortBear`) for automatic sorting of imports. 
* Sort imports automatically and if check how isort did afterwards. If you have 
  problems with Coala sorting, discuss at slack channel [#django-team][5] and possibly
  add ignore comments in [coala][5].
* Put imports in these groups: future, standard library, third-party libraries
* and Django components, local Django component, try/excepts.
* On each line, alphabetize the items with the upper case items grouped before 
  the lower case items.
* Break long lines using parentheses and indent continuation lines by 4 spaces.

Templates:

* Put one space between the curly brackets and the tag contents like `{{ var }}`

Models:

```
class Person(models.Model):
    first_name = models.CharField(max_length=20)  # field names lowercased with underscore
    last_name = models.CharField(max_length=40)

    # custom managers here

    class Meta:                                   # Meta appear after the fields are defined
        verbose_name_plural = 'people'

    # methods ordering:
    # def __str__()
    # def save()
    # def get_absolute_url()
    # any other custom methods...
```

[Complete documentation][2].

## Coala

[Coala][6] is a language independent code analysis library. Provides a unified command-line interface
for linting and fixing all your code, regardless of the programming languages you use.
If you never worked with Coala, you may try [tutorial][7].

* Coala is modular and customizable. Configuration is stored in `.coafile`
  (i.e. [kiwibase coafile][8]). There are a few bears we use, docs to every one
  of them can be found [here][11].
* We use version coala [0.9][9] and coala-bears [0.9.1][10].
* Running Coala (in the working directory):
  * Tox: `tox -e coala` 
  * Docker:  
 `docker run --rm -ti --volume=$(pwd):/app --workdir=/app coala/base:0.9 coala`
* Coala example usage (unnecessary line split):

```
$ tox -e coala
...
|  33|    |-    url(r'^accounts/',
|  34|    |-        include('allauth.urls')),
|    |  33|+    url(r'^accounts/', include('allauth.urls')),
|  35|  34|     url(r'^admin/', include(admin.site.urls)),
...
```
  Coala replaces this code block:
  
```python
url(r'^accounts/',
    include('allauth.urls')),
```
  With one liner (fixed by `YapfBear` - Yet Another Python Formatter bear ):
  
```python
url(r'^accounts/', include('allauth.urls')),
```
* Coala can fix some problems automatically:
  * Tox - `tox -e coala -- -a` where:
  * Docker - `docker run --rm -ti --volume=$(pwd):/app --workdir=/app coala/base:0.9 coala -an`
    * `-a`, or `--apply-patches` - apply all patches automatically if possible
    * `-n`, or `--no-orig` - don't create .orig backup files before patching
* Ideally use pre-commit hook that will run Coala checks before each commit.
  These hooks are usually part of repo (Kiwibase  [pre-commit hook][13]).
  To enable them, copy/symlink them to your git pre-commit folder (i.e. run  
  `ln -s ../../extras/_hooks/pre-commit .git/hooks/pre-commit` in repo directory).
  
* Even though Coala is a great help to any team, it is not almighty! Check changes Coala made,
  if you disagree with any, discuss on [#django-team][15] Slack channel and/or [ignore specific lines][5].


## Exceptions

We make agreement in team to ignore this PEP8 rules:

* `E402 module level import not at top of file`  
  In fact we follow this rule, but it is violated in `settings.py` and 
  `wsgi.py` file


[1]: https://www.python.org/dev/peps/pep-0008/
[2]: https://docs.djangoproject.com/en/dev/internals/contributing/writing-code/coding-style/
[3]: https://coala.io/
[4]: https://gitlab.skypicker.com/django-team/kiwibase/blob/master/.coafile#L62
[5]: https://coala.readthedocs.io/en/stable/Users/Tutorials/Tutorial.html#ignoring-code-inside-files
[6]: https://docs.coala.io/en/latest/
[7]: http://docs.coala.io/en/latest/Users/Tutorial.html
[8]: https://gitlab.skypicker.com/django-team/kiwibase/blob/master/.coafile
[9]: https://gitlab.skypicker.com/django-team/kiwibase/blob/master/.gitlab-ci.yml#L15
[10]: https://gitlab.skypicker.com/django-team/kiwibase/blob/master/tox.ini#L8
[11]: https://github.com/coala/bear-docs/tree/master/docs
[12]: https://gitlab.skypicker.com/django-team/kiwibase#optional
[13]: https://gitlab.skypicker.com/django-team/kiwibase/blob/master/extras/_hooks/pre-commit
[15]: https://skypicker.slack.com/archives/django-team
