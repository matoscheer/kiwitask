# Sensitive data

Main focus of our team is on Kiwibase application, which operates over lot of
sensitive datasets. We must care about every piece of information we are
working on and ensure, that this information will not leak outside our team.

This is our basic policy:

* We don't publish any data about people or company to git repository. Think
  about nature of that data. Could they be used to compromise any employee or
  company? If so, they probably don't belong to repository.
* We don't store and publish any credentials in repository (like Google Auth 
  JSONs, text files with username/passwords combinations, etc.). Sensitive
  config data must be propagated to application through ENV variables.
* Sometimes you will need to create fixture, data migration or some other
  helper file with data. Repeat basic rule (1). 
* We don't speak with other people in company about any sensitive information
  we work on. Kiwibase database content is confidental.
* If you don't understand data structure or have any other doubts, ask your
  project manager or team leader before you publish (push) anything.

## Where to store important sensitive data

TBD
