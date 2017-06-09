# Weirds

## Django 

### Missing permissions in data migration

Description:

* You make DB migration with some permission changes, for example add whole new permission to see
  new section of your app
* You prepare also data migration, which will add this new permission to existing groups

Problem:

* You will have no access to those new permissions in migrations; they will be created after
  last processed migration, because related code live in `post_migrate` handler

Solution:

* You could try to invoke `emit_post_migrate_signal` manualy prior to data migration:
  https://code.djangoproject.com/ticket/23422#comment:20
  Unfortunatelly it work just in migrations applied on already existed DB. If we run those
  migration during test (which create whole new DB schemas from scratch), it fails inside
  `Site` application.
