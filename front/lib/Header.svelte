<script>
    import MainLogo from "./MainLogo.svelte";
    import Pill from "./Pill.svelte";
    let { isConnected } = $props();
</script>

<header>
    <MainLogo />
    <Pill {isConnected} />
</header>

<style>
    header {
        background: var(--main-color);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }
</style>
