# Tips & tricks

## Cron

* If you change timezone on server, you must also restart cronjob and syslog 
  `service cron restart; service rsyslog restart`; if you forgot, this services will still
  use old TZ settings

* If you want to see output from your cronjobs in logger, add to crontab entry expression 
  `2>&1 | logger -t avian-resources`, for example:
```
*/2 * * * * /opt/venvs/avian-resources/bin/python /srv/avian-resources/manage.py employees_export_cafeteria 2>&1 | logger -t avian-resources
```

## Exception from warnings

During development, you can turn  warnings into exceptions and get a traceback by adding the following to your settings file:

```
    import warnings
    warnings.filterwarnings(
        'error', r"DateTimeField .* received a naive datetime",
        RuntimeWarning, r'django\.db\.models\.fields',
    )
```

Tip from @lukas.vojt: https://gitlab.skypicker.com/django-team/kiwibase/issues/209