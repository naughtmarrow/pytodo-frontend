<script lang="ts">
import favicon from "$lib/assets/favicon.svg";
import '../app.css'

let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<h1>This is a global layout</h1>
{@render children?.()}
