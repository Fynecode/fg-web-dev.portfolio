<template>
  <main class="admin-login" aria-label="Forgot Password Sent Page">
    <div class="form-container">
      <div class="form-header">
        <h2 class="text-white text-4xl">Check Your Email</h2>
      </div>
      <div class="text-white/70 text-center space-y-3">
        <p>If an account exists for that email, you’ll receive a reset link.</p>
        <p>The link expires in 15 minutes.</p>
      </div>
      <RouterLink to="/" class="bg-white p-2 w-[60%] cursor-pointer hover:bg-white/90 transition-all rounded text-center">
        Back to login
      </RouterLink>
    </div>
  </main>
</template>
