<script>
    let { isConnected } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->

<div
    class="pill {isConnected ? 'connected' : 'disconnected'}"
    onclick={() => {
        if (isConnected) {
            localStorage.removeItem("token");
            location.reload();
        }
    }}
></div>

<style>
    .pill {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 100%);
        border: 2px solid white;
    }

    .connected {
        background-color: var(--secondary-color);
    }

    .disconnected {
        background-color: red;
    }

    .pill:hover {
        cursor: pointer;
        transform: translate(-100%, 100%) scale(1.25);
    }
</style>
