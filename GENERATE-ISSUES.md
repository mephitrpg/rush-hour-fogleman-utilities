# Issues Solutions and Cards Generator

This script generates the solutions for given issues.

The script reads a given folder containing multiple text files named ``hash_<cardNumber>.txt``, containing each the hash of a single issue, then generates a  ``data.js`` file in the folder. The solutions [are bugged](https://github.com/fogleman/rush/issues/2) but the editor and the viewer (see following paraghaps) always provide them fixed.

In this repository you can find the ``data/michael-fogleman-top-23`` folder containing Michael Fogleman's "Top 23" hashes, but you can create your own folder and use the editor in ``web/index.html`` to create your own hashes, as well as the hash of already existing issues.

A view of printable cards with solution on the back is available. To see it, in your browser open the local file ``web/generated-issues-viewer.html`` adding the following parameters to the URL ``?folder=<folderPath>`` to the URL.

- folder (required) = The path of the folder containing the hashes, starting from the folder which contains the viewer, usually the "web" folder of this repository.
- nameColor (optional) = The color of the name. Default value: white (#ffffff).
- nameBgColor (optional) = The background color of name. Default value: green (#00dd00).
- name (optional) = The name of the series of cards. Defaylt value: the folder's name.

Note: parameters should be [url encoded](https://www.w3schools.com/jsref/jsref_encodeuricomponent.asp).

URL Example:

``file:///C:/Users/john/Documents/rush-hour-fogleman-utilities/web/index.html?folder=../data/michael-fogleman-top-23

## Requirements

The script requires the GO language and nodejs are installed.

## Execution

From terminal, run the following command.

````node generate-issues.js <folderPath>````
