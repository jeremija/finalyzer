# Finalyzer ![build-status][1]

Your private and personal financial data analyzer.

Work in progress.

![screenshot][2]

Should be able to parse bank statements in `.qfx` and display nice charts, as
well as provide the ability to dynamically tag transactions.

Written in Python (Flask, SQLAlchemy) and JavaScript (React, Redux).

# Usage

Install dependencies and compile javascript and less:

```bash
make
```

Import your own `*.QFX` file:

```bash
./env/python3 -m finalyzer.import /path/to/your.qfx
```

Run the server:

```bash
make server
```

Open your browser at [localhost:5000][3]

[1]: https://api.travis-ci.org/jeremija/finalyzer.svg
[2]: http://i.imgur.com/ebnjk9X.png
[3]: http://localhost:5000
