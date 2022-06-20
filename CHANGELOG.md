# CHANGELOG

This document lists the changes introduced by this fork.

## Version 2.4.1

* Include Angular 14 as peer dependency 

## Version 2.4.0

* Adds `getFilteredAndSorted()` to the interface of `DataSource`
* Fixes `getFilteredAndSorted()` and `getAll()` of `ServerDataSource`
* Fixes inconsistent `DataSource.count()` implementations
* Fixes "Expand" button not having a `margin-right`
* Fixes multi-select column having an undefined width
* Fixes wrong colspan for `noDataMessage` and expanded rows when the table has a multi-select column

## Version 2.3.1

* Fixes regression: `filter: false` in a column setting did not work anymore

## Version 2.3.0

* Fixes a regression where selected rows stick to the top of the table after sorting
* Fixes a bug where invoking `empty()` on a data source does not result in refreshing the table

## Version 2.2.1

* Fixes duplicate rows when the row is already selected
* Updates dependencies

## Version 2.2

* Finally, the project got more maintainers!

## Version 2.1

* Angular 13 support (thanks [stephanrau](https://github.com/stephanrauh))
* Fixes default filter function not working when column contains null values (issue #32)
* Fixes default sort function producing invalid results when column contains null values (issue #34)
* Default sort function can now recognize numbers and strings
* Fixes spelling error regarding `sortDirection` setting (issue #36)
* Add compatibility for deprecated settings keys (issue #30)

## Version 2.0

* Added hide/show row
* Added Expandable Row (thanks [Samir](https://github.com/mominsamir))
* Added Column resizing (thanks [dreswgfuse](https://github.com/dreswgfuse))
* Added Multi Select for a column (thanks [thangluu93](https://github.com/thangluu93))
* Added type to Settings object
* Added Column resizing (thanks [dreswgfuse](https://github.com/dreswgfuse))
* Added custom action render component (thanks [bacali95](https://github.com/bacali95))
* Added Column sorting/filtering to nested objects (thanks [TejinderEvry](https://github.com/TejinderEvry))
* Added row data to custom component render (thanks [marchrius](https://github.com/marchrius))
* Include row data when invoking filterFunction (thanks [darrenhollick](https://github.com/darrenhollick))
* Ability to select a row programmatically (thanks [NicolaLC](https://github.com/NicolaLC))
