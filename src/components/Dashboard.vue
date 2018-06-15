<template>
  <v-container grid-list-md >
    <v-layout row wrap >
      <v-flex xs11>
        <v-text-field
          label="하고 싶은말?"
          v-model="comment"
        ></v-text-field>
      </v-flex>
      <v-flex xs1>
        <v-btn color="primary" fab small dark @click="addBoard">
          <v-icon >edit</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-for="(item, key) in this.comments" :key="key" >
      <v-flex xs12 >
        <v-card dark color="blue" >
          <v-card-text >{{ item.comment }}</v-card-text>
          <v-icon class="remove-icon" v-if="item.isOwn"
          @click="commentRemove({item,key})">mdi-minus-circle-outline</v-icon>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapMutations, mapActions, mapState } from 'vuex';
import fb from '@/packages/firebaseConfig';

export default {

  data() {
    return {
      comment: '',
    };
  },
  created() {
    this.getBoard();
  },
  computed: {
    ...mapState([
      'comments',
    ]),
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions([
    ]),
    addBoard() {
      fb.commentsCollection.add({
        uid: this.$auth.getUser().uid,
        comment: this.comment,
        create_date: new Date(),
      })
        .then((docRef) => {
          this.$store.commit('pushComments', {
            payload: {
              id: docRef.id,
              uid: this.$auth.getUser().uid,
              comment: this.comment,
              isOwn: true,
            },
            isAdd: true,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getBoard() {
      this.$store.commit('clearComments');
      const uid = this.$auth.getUser().uid;
      fb.commentsCollection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          if (data.uid === uid) {
            data.isOwn = true;
          } else {
            data.isOwn = false;
          }
          this.$store.commit('pushComments', {
            payload: data,
          });
        });
      });
    },
    commentRemove({ item, key }) {
      console.log(item.id);
      fb.commentsCollection.doc(item.id).delete().then(() => {
        console.log('Document successfully deleted!');
      }).catch(() => {
        console.error('Error removing document: ');
      });
      this.$store.commit('removeComment', {
        item,
        key,
      });
    },
  },
};
</script>
<style lang="scss">
.remove-icon {
    position: absolute;
    right: 2%;
    top: 50%;
    margin-top: -12px;
    cursor: pointer;
}
</style>
