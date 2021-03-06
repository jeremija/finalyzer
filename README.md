# Finalyzer [![Build Status][1]][2]

Your private and personal financial data analyzer.

Work in progress.

![screenshot][3]

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
./env/bin/python -m finalyzer.import /path/to/your.qfx
```

Run the server:

```bash
make server
```

Open your browser at [localhost:5000][4].

[1]: https://travis-ci.org/jeremija/finalyzer.svg?branch=master
[2]: https://travis-ci.org/jeremija/finalyzer
[3]: http://i.imgur.com/ebnjk9X.png
[4]: http://localhost:5000
