# Issues Solutions and Cards Generator

This script generates the solutions for given issues.

The script reads a given folder containing multiple text files named ``hash_<cardNumber>.txt``, containing each the hash of a single issue, then generates a  ``data.js`` file in the folder. The solutions [are bugged](https://github.com/fogleman/rush/issues/2) but the editor and the viewer (see following paraghaps) always provide them fixed.

In this repository you can find the ``data/michael-fogleman-top-23`` folder containing Michael Fogleman's "Top 23" hashes, but you can create your own folder and use the editor in ``web/index.html`` to create your own hashes, as well as the hash of already existing issues.

A view of printable cards with solution on the back (max 66 moves) is available. To see it, in your browser open the local file ``web/generated-issues-viewer.html`` adding the parameter ``?folder=<folderPath>`` to the URL.

URL Example: ``file:///C:/Users/john/Documents/rush-hour-fogleman-utilities/web/index.html?folder=../data/michael-fogleman-top-23&nameColor=#ffffff&nameBackgroundColor=#ff0000&name=Top23``

## Requirements

The script requires the GO language and nodejs are installed.

## Execution

From terminal, run the following command.

````node generate-issues.js <folderPath>````
