import unittest

def suite():   
    return unittest.TestLoader().discover("pk.tests", pattern="*.py")
