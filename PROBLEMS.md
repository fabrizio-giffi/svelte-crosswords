# Problems

Probably I need to review the entire way I keep data in memory. Class? Store?\
Something tells me that I fucked up with state on the +page.svelte file\
Local storage handling is also subpar. Why would I have to store each single property instead of being able of saving the entire crossword object?

- reminder to self: when I tried storing the entire crossword object the 'proxies' were not being saved, aka cells and definitions

Research about [form actions](https://svelte.dev/docs/kit/form-actions) vs. [api server code](https://svelte.dev/docs/kit/routing#server).
I don't think that a form is the correct way to handle the payload with hundreds of cells and definitions.\
Is objection worth it?