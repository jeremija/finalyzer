# Finalyzer

Your private and personal financial data analyzer.

Work in progress.

![screenshot][1]

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

Open your browser at [localhost:5000][2]

[1]: http://i.imgur.com/ebnjk9X.png
[2]: http://localhost:5000
