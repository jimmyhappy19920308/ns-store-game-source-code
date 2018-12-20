<template>
  <div>
    <!-- headers -->
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <router-link class="navbar-brand text-danger" to="/"
        ><i class="fab fa-nintendo-switch"></i> NS GameStore</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link text-danger" to="/">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-success font-weight-bold" to="/coupon"
              >領取優惠</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
