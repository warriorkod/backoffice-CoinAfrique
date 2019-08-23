# Backoffice

## Project arhitecture

All neccessary components and conainters can be found either under `app/components` or `app/containers` directories.

However, for the new components we suggest to use next approach:
https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7

Try to group new components inside of appropriate module under `app/modules/*module name*/components/*component name*`. At first glance it might seem redurantly nested, howerver this approach allows organize more components in more efficient way as well as split content on more amount of nested parts.
