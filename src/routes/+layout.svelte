<script>
  import "../app.css";
</script>

<nav class="navbar bg-primary text-primary-content mb-5">
  <div class="navbar-start">
    <a href="/" class="text-2xl pl-5 normal-case font-semibold">Password Manager</a> 
  </div>
  <div class="navbar-end">
    <a href="/" class="btn btn-ghost normal-case text-xl navbar-center"
      >Sign Up</a
    >
    <a href="/login" class="btn btn-ghost normal-case text-xl navbar-center">Log in</a>
  </div>
</nav>

<slot />
