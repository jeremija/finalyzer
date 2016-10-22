from ofxparse.ofxparse import OfxParser
from .db import db
from .service import import_ofx
import sys


with open(sys.argv[1], 'rb') as f:
    ofx = OfxParser.parse(f)
    import_ofx(ofx)
    db.session.commit()
