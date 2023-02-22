# Issue Cards Generator

This script generates the solutions for given issues.

The script reads a given folder containing multiple text files named ``hash_<cardNumber>.txt``, containing each the hash of a single issue, then generates ``solution_<cardNumer>.txt`` files containing the solution. The content of solutions files [is bugged](https://github.com/fogleman/rush/issues/2) but the editor and the viewer (see following paraghaps) will take care of it.

A ``data.js`` file will be created into the folder too.

You will find the ``data/michael-fogleman-top-23`` folder containing Michael Fogleman's "Top 23" hashes, but you can create your own folder and use the editor in ``web/index.html`` to create your hashes.


A view of printable cards with solution on the back (max 66 moves) is available. To see it, in your browser open the local file ``web/generated-issues-viewer.html`` adding the parameter ``?folder=<folderPath>`` to the URL.

URL Example: ``file:///C:/Users/john/Documents/rush-hour-fogleman-utilities/web/index.html?folder=../data/michael-fogleman-top-23``

## Requirements

This script requires nodejs (it will execute ``generate-issues-data.js``).

## Execution

From terminal, run the following command.

### MacOS
sh ./generate-issues.sh <folderPath>
