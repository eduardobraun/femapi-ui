<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>Projects</h4></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-btn slot="activator" small color="success">
          <v-icon left small>fas fa-plus</v-icon>
          New Project
        </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">New Project</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>
            <v-btn color="blue darken-1" flat @click="clear">Close</v-btn>
            <v-btn :disabled="!valid" color="blue darken-1" flat @click="submit">Create</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <ApolloQuery
        ref="currentUser"
        :query="require('@/graphql/CurrentUser.gql')"
      >
      <div slot-scope="{ result: { data } }">
        <template v-if="data">
          <v-data-table
            :headers="headers"
            :items="data.currentUser.projects"
            hide-actions
            class="elevation-0"
          >
            <template slot="items" slot-scope="props">
              <tr @click="openProject(props.item.id)" class="pointer">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-left">
                <v-chip color="grey" text-color="white" v-for="member in props.item.members" :key="member.user.id">
                  <v-avatar>
                    <v-icon>account_circle</v-icon>
                  </v-avatar>
                  {{ member.user.name }}
                </v-chip>
              </td>
              <td class="text-xs-right">
                <v-btn flat icon color="grey">
                  <v-icon>fas fa-share-alt</v-icon>
                </v-btn>
                <v-btn flat icon color="grey">
                  <v-icon>settings</v-icon>
                </v-btn>
                <v-btn flat icon color="grey" @click="delete_project(props.item)">
                  <v-icon>delete</v-icon>
                </v-btn>
                <!-- <v-dialog v-model="dialog_del_proj" persistent max-width="290"> -->
                <!--   <v-btn slot="activator" flat icon color="grey" :key="props.item.id"> -->
                <!--     <v-icon>delete</v-icon> -->
                <!--   </v-btn> -->
                <!--   <v-card> -->
                <!--     <v-card-title class="headline">Are you sure?</v-card-title> -->
                <!--     <v-card-text>If you confirm this action the project {{ props.item.name }} will be removed.</v-card-text> -->
                <!--     <v-card-actions> -->
                <!--       <v-spacer></v-spacer> -->
                <!--       <v-btn color="green darken-1" flat @click.native="dialog_del_proj = false">Disagree</v-btn> -->
                <!--       <v-btn color="green darken-1" flat @click="delete_project(props.item)">Agree</v-btn> -->
                <!--     </v-card-actions> -->
                <!--   </v-card> -->
                <!-- </v-dialog> -->
              </td>
              </tr>
            </template>
          </v-data-table>
        </template>
      </div>
      </ApolloQuery>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
import CURRENT_USER from "@/graphql/CurrentUser.gql";
import NEW_PROJECT from "@/graphql/NewProject.gql";
import DEL_PROJECT from "@/graphql/DeleteProject.gql";

export default {
  data() {
    return {
      dialog: false,
      dialog_del_proj: false,
      valid: true,
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length >= 5) || "Name must have at least 5 characters"
      ],
      headers: [
        {
          text: "Name",
          align: "left",
          value: "name"
        },
        { text: "Members", value: "members" },
        { text: "Action", value: "action", align: "right" }
      ]
    };
  },
  apollo: {
    currentUser: {
      query: CURRENT_USER
    }
  },
  computed: {},
  methods: {
    openProject(pid) {
      this.$store.commit("selectProject", { pid: pid });
      this.$router.push({ name: "projecthome" });
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.create_project({ name: this.name });
      }
    },
    clear() {
      this.$refs.form.reset();
      this.dialog = false;
    },
    async create_project(data) {
      await this.$apollo.mutate({
        mutation: NEW_PROJECT,
        variables: {
          name: data.name
        }
      });
      this.$apollo.queries.currentUser.refetch();
      this.dialog = false;
    },
    async delete_project(project) {
      console.log("Deleting project: ", project.id, project.name);
      await this.$apollo.mutate({
        mutation: DEL_PROJECT,
        variables: {
          pid: project.id
        },
        update: store => {
          const data = store.readQuery({ query: CURRENT_USER });
          const index = data.currentUser.projects.findIndex(
            p => p.id === project.id
          );
          if (index !== -1) data.currentUser.projects.splice(index, 1);
          store.writeQuery({ query: CURRENT_USER, data });
        }
      });
      this.dialog_del_proj = false;
    }
  }
};
</script>

<style lang="stylus">
.pointer
  cursor: pointer
</style>
