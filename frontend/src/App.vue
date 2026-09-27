<template>
  <div>
    <div class="bug-form">
      <h2>Bug Tracker</h2>
      <div class="form-line">
        <span class="form-item">
          <label>Title: </label>
          <input id="title" type="text" v-model="title" required />
        </span>

        <span class="form-item">
          <label>Priority: </label>
          <select id="priority" v-model="priority">
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </span>
      </div>

      <div class="form-line">
        <span class="form-item">
          <label>What's the matter? </label>
          <textarea
            id="title"
            rows="4"
            cols="50"
            v-model="description"
            required
            placeholder="Describe the problem..."
          />
        </span>
      </div>

      <div class="form-line">
        <span class="form-item">
          <button @click="handleSaveBug">Save bug</button>
        </span>
      </div>
    </div>

    <div class="bug-table">
      <h2>Bugs List</h2>
      <table>
        <thead>
          <tr>
            <th>Bug</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Creation date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(bug, index) in bugs">
            <td>{{ bug.title }}</td>
            <td>{{ bug.description }}</td>
            <td>{{ bug.priority }}</td>
            <td>{{ bug.status }}</td>
            <td>{{ bug.created_at }}</td>
            <td>
              <button title="delete bug" @click="deleteBug(bug.id)">
                <span class="material-symbols-outlined">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    //define estado inicial de variaveis
    return {
      id: "",
      title: "",
      description: "",
      priority: "LOW",
      bugs: [
        {
          title: "Bug 1",
          description: "sffdfsdf",
          status: "555",
          priority: "XCV",
          created_at: "2026-09-22 20:19:21",
        },
        {
          title: "Bug 2",
          description: "asasas",
          status: "123",
          priority: "ABC",
          created_at: "2026-09-22 20:19:21",
        },
      ],
    };
  },
  async created() {
    const bugs = await this.fetchBugData();
    this.bugs = bugs;
  },
  methods: {
    async handleSaveBug(event) {
      if (!this.title.trim() || !this.description.trim()) {
        window.alert("Title and description are required!");
        return;
      }

      const body = {
        title: this.title,
        description: this.description,
        priority: this.priority,
      };

      const resp = await this.saveBug(body);

      if (resp.statusCode == 200) {
        window.alert("Your bug was saved!");

        this.bugs = await this.fetchBugData();
        this.title = "";
        this.description = "";
        this.priority = "LOW";
      }
    },

    async saveBug(body) {
      const resp = await fetch("/bugs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      return resp.json();
    },

    async fetchBugData() {
      const resp = await fetch("/bugs", {
        method: "GET",
      });

      const data = await resp.json();
      console.log(data);
      return data.bugs;
    },

    async deleteBug(id) {
      const resp = await fetch(`/bugs/${id}`, {
        method: "DELETE",
      });

      const data = await resp.json();

      if (data.statusCode == 200) {
        window.alert("Bug deleted!");
      }

      this.bugs = await this.fetchBugData();
      return data;
    },
  },
};
</script>

<style>
.bug-form,
.bug-table {
  margin: 30px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  display: flex;
  flex-direction: column;
}

.form-line {
  width: 50%;
  margin: 5px;
  display: flex;
  flex-direction: row;
  gap: 12px;
}

.form-item {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: start;
}

.form-item input,
.form-item select,
.form-item textarea {
  width: 100%;
  box-sizing: border-box;
}

table,
th,
td {
  border: 1px solid;
}

table {
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
}

.material-symbols-outlined {
  font-family: "Material Symbols Outlined";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
}
</style>
