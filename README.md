# Warehouse Manager

## Opis projektu
Aplikacja wspiera zarządce magazynu firmy kurierskiej.
System umożliwia zarządzanie przesyłkami, ostrzeżeniami, pojazdami oraz czujnikami.
W panelu klienckim można na żywo obserwować dane odbierane przez czujniki, ostrzeżenia oraz aktywne pojazdy. Dodatkowo przedstawione są przesyłki, które w wypadku dostarczenia można usunąć z panelu. Dostęp wymaga uwierzytelnienia.

Funkcjonalności aplikacji oraz wykorzystane protokoły:

HTTP
Możliwość wykonywania operacji CRUD na danych:
- paczkach,
- pojazdach,
- ostrzeżeniach,
- czujnikach

MQTT
- czujnik temperatury,
- czujnik wilgotności,
- pozycja pojazdów,
- status przesyłek

WebSocket - transmisja danych w czasie rzeczywistym:
- odbiór ostrzeżeń,
- dodawanie ostrzeżeń,
- aktualne odczyt temperatury,
- aktualne odczyt wilgotności,
- ruch pojazdów,

Poza tym został utworzony i wykorzystany certyfikat TLS,

Z protokołów backendowych można korzystać po stronie klienckiej,

Hasło jest haszowane przy użyciu bcrypt,

Wykorzystano pliki cookie
