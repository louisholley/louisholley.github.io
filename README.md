# louisholley.github.io
```python
@service.handle('custom_event')
def send_custom_event_notification(*args, **kwargs):
    notification = CustomNotification(...)
    notification.dispatch()
```
