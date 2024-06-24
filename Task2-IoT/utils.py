def get_iso_date():
    timestamp = utime.time()
    year, month, day, hour, minute, second, weekday, yearday = utime.localtime(timestamp)
    return "{:04d}-{:02d}-{:02d}T{:02d}:{:02d}:{:02d}".format(year, month, day, hour, minute, second)