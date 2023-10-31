<script lang="ts">
  import { firebaseApp, firebaseAuth, firestore } from "$lib/firebaseinit";
  import { onAuthStateChanged, type User } from "firebase/auth";
  import { userCred } from "$lib/stores";

  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      console.log(`User is signed in as ${user.email}`);
    }
  });
</script>
