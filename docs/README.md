# Catalog

A display of `Wireframe` elements.

There is a server <--> client set of events that involve interaction.

There needs to be clear signals that "interactive" components are not interactive
until they are "hydrated"

Everyone has encountered this scenario, after a query, DOM elements are drawn but they're not interactive.
Accordian content hasn't been loaded and does not drop down. Checkboxes are checked but do not un-check.

css only

First paint

-> js required areas signal if javascript not enabled

-> content "yet to be hydrated" is drawn

-> unhydrated should indicate it is not interactive yet

-> once hydrated, components should indicate hydration


