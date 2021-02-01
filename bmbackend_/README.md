# BM_Backend
```
Item
int quantity
float weight
PaymentInterval interval
ItemClass itemClass
DateTime dateTime
Location location
Group[] groups
Price price
User buyer;

ItemClass --> name needs to be changed
String label
String description
Tag[] tags

PaymentInterval
int modifier
Interval interval

Interval
ONCE
WEEKLY
MONTHLY
YEARLY



Tag --> predefined inital set of tags, e.g. {vegetables, electronics, cloth, alcohol, luxury}
String label


Location
float latitude
float longitude
Store store

Store
String label
String description
String url


Price --> lookup for existing libraries
BigDecimal price
Currency currency


User
String firstName
String lastName
String email
ExchangeRate[] rates
Currency mainCurrency


Group
User[] admins
User[] users
String label
String description


ExchangeRate
Currency source
Currency destination
BigDecimal rate
LocalDateTime start
LocalDateTime end

```
