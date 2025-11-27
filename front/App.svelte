<script>
  import Header from './lib/Header.svelte';
  let isConnected = $state(false);
</script>

<Header {isConnected} />
<main>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 2rem;
  }
</style>
