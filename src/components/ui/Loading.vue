<style scoped>
  .spinner-container {
    width: 200px;
    height: 200px;
    position: relative;
    margin: 30px auto;
    overflow: hidden;
  }

  .spinner {
    position: absolute;
    width: calc(100% - 9.9px);
    height: calc(100% - 9.9px);
    border: 5px solid transparent;
    border-radius: 50%;
    border-top-color: var(--primary-color);
    animation: spin 5s cubic-bezier(0.17, 0.49, 0.96, 0.79) infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
</style>

<template>
  <div class="spinner-container">
    <div class="spinner">
     <div class="spinner">
      <div class="spinner">
        <div class="spinner">
          <div class="spinner">
              <div class="spinner"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
