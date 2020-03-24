#!/usr/bin/env python3
# See: https://github.com/pr3d4t0r/COVIDvu/blob/master/LICENSE
# vim: set fileencoding=utf-8:


from covidvu.pipeline.vujson import SITE_DATA
from covidvu.pipeline.vujson import dumpJSON

import json
import os


# +++ constants +++

COUNTIES_US_FILE       = 'counties-US-all.json'
COUNTY_CASES_CSBS_FILE = 'counties-US-all-20200324.json'
SITE_RESOURCES         = 'resources'


# --- main ---

def processCounties( siteResources  = SITE_RESOURCES,
                     countiesFile   = COUNTY_CASES_CSBS_FILE,
                     siteData       = SITE_DATA,
                     outputFileName = COUNTIES_US_FILE):

    inputFileName = os.path.join(siteResources, countiesFile)
    with open(inputFileName, 'r') as inputFile:
        regions = json.load(inputFile)

    dataset = dict()
    for region in regions:
        state = region['state']
        if state not in dataset:
            dataset[state] = dict()

        county = region['county']
        latest = region['latest']
        del(latest['recovered'])
        
        dataset[state][county] = latest

    dumpJSON(dataset, os.path.join(siteData, outputFileName))

    return dataset


if '__main__' == __name__:
    processCounties()

