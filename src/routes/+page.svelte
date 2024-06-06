<script lang="ts">
	import { enhance } from '$app/forms';

	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

{#if form?.success}
	<h1>{form.message}</h1>
	<p>link is: <a href={form.link}>{form.link}</a></p>
{/if}

{#if form?.invalid}
	<h1>{form.message}</h1>
{/if}

{#if form?.exists}
	<h1>{form.message}</h1>
	<p>link is: <a href={form.link}>{form.link}</a></p>
{/if}

<form method="POST" use:enhance>
	<label for="bigUrl">
		URL
		<input type="text" name="bigUrl" id="bigUrl" />
	</label>
	<button type="submit">Submit</button>
</form>
