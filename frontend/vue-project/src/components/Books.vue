<template>
    <div class="container-fluid">
      <div class="row no-gutters">
        <div id="box" class="col">
          <ul>
            <li>
              <router-link to="/">Books</router-link>
            </li>
            <li>
              <router-link to="/profile">Profile</router-link>
            </li>
            <li>
              <router-link v-if="!isLoggedIn" to="/login">Sign in</router-link>
              <a v-if="isLoggedIn" @click="already_signed">Sign in</a>
            </li>
            <li>
              <a v-if="isLoggedIn" @click="logout">Log Out</a>
            </li>
          </ul>
          <hr>
          <div id="sort-bar">
            <button type="button" class="btn btn-success btn-sm" @click="toggleAddBookModal">Add Book</button>
            <p>&emsp; </p>
            <select name="sortBy" id="select" v-model="sortBy">
            <option value="alphabetically">Alphabetically</option>
            <option value="price">Price</option>
            </select>
            <p>&emsp; </p>
            <button v-on:click="ascending = !ascending" class="ascending-button">
            <i v-if="ascending">↑</i>
            <i v-else>↓</i>
            </button>
          </div>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in sortedBooks">
                <td>{{ book.title }}</td>
                <td>{{ book.author }}</td>
                <td>{{ book.price }}</td>
                <td>
                  <div class="btn-group" role="group">
                    <button type="button" class="btn btn-warning btn-sm" @click="toggleEditBookModal(book)">Update</button>
                    <button type="button" class="btn btn-danger btn-sm" @click="handleDeleteBook(book)">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <div
        ref="addBookModal"
        class="modal fade"
        :class="{ show: activeAddBookModal, 'd-block': activeAddBookModal }"
        tabindex="-1"
        role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add a new book</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="toggleAddBookModal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="addBookTitle" class="form-label">Title:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="addBookTitle"
                    v-model="addBookForm.title"
                    placeholder="Enter title">
                </div>
                <div class="mb-3">
                  <label for="addBookAuthor" class="form-label">Author:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="addBookAuthor"
                    v-model="addBookForm.author"
                    placeholder="Enter author">
                </div>
                <div class="mb-3">
                  <label for="addBookPrice" class="form-label">Price:</label>
                  <input
                    type="number"
                    class="form-control"
                    id="addBookTitle"
                    v-model="addBookForm.price"
                    placeholder="Enter price">
                </div>
                <div class="btn-group" role="group">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="handleAddSubmit">
                    Submit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="handleAddReset">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeAddBookModal" class="modal-backdrop fade show"></div>

      <div
        ref="editBookModal"
        class="modal fade"
        :class="{ show: activeEditBookModal, 'd-block': activeEditBookModal }"
        tabindex="-1"
        role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Update</h5>
                <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="toggleEditBookModal">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                <div class="mb-3">
                    <label for="editBookTitle" class="form-label">Title:</label>
                    <input
                    type="text"
                    class="form-control"
                    id="editBookTitle"
                    v-model="editBookForm.title"
                    placeholder="Enter title">
                </div>
                <div class="mb-3">
                    <label for="editBookAuthor" class="form-label">Author:</label>
                    <input
                    type="text"
                    class="form-control"
                    id="editBookAuthor"
                    v-model="editBookForm.author"
                    placeholder="Enter author">
                </div>
                <div class="mb-3">
                    <label for="editBookPrice" class="form-label">Price:</label>
                    <input
                    type="text"
                    class="form-control"
                    id="editBookPrice"
                    v-model="editBookForm.price"
                    placeholder="Enter price">
                </div>
                <div class="btn-group" role="group">
                    <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="handleEditSubmit">
                    Submit
                    </button>
                    <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="handleEditCancel">
                    Cancel
                    </button>
                </div>
                </form>
            </div>
            </div>
        </div>
        </div>
        <div v-if="activeEditBookModal" class="modal-backdrop fade show"></div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        activeEditBookModal: false,
        editBookForm: {
            id: '',
            title: '',
            author: '',
            price: null,
        },
        activeAddBookModal: false,
        addBookForm: {
            title: '',
            author: '',
            price: null,
        },
        books: [],
        ascending: false,
        sortBy: '',

      };
    },
    computed: {
        isLoggedIn: function() {
          return this.$store.getters.isAuthenticated;
        },
        sortedBooks(){
            let tempBooks = this.books;
            if (this.sortBy == ''){
                return this.books
            }

            tempBooks = tempBooks.sort((a, b) => {
            if (this.sortBy == 'alphabetically') {
                let fa = a.title.toLowerCase(), fb = b.title.toLowerCase()
          
                if (fa < fb) {
                    return -1
                }
                if (fa > fb) {
                    return 1 
                }
                return 0
              
            } else if (this.sortBy == 'price') {
                return a.price - b.price
            }})
        
            if (!this.ascending) {
        	    tempBooks.reverse()
            }
            return tempBooks
        }
    },
    methods: {
      already_signed() {
        this.$toast("Already signed in!", "warning")
      },
      logout () {
        this.$store.dispatch('logOut');
        this.$toast("You logged out!", "success")
      },
      addBook(payload) {
        const path = 'items';
        axios.post(path, payload)
          .then(() => {
            this.getBooks();
            this.$toast("Book added!","success");
          })
          .catch((error) => {
            console.log(error)
            let detail = error.response.data.detail[0].msg;
            this.$toast(detail,"error");
            this.getBooks();
          });
      },
      getBooks() {
        const path = 'items';
        axios.get(path)
          .then((res) => {
            this.books = res.data;
          })
          .catch((error) => {
            this.$toast("Something went wrong!","error");
            console.error(error);
          });
      },
        updateBook(payload, bookID) {
        const path = `items/${bookID}`;
        axios.put(path, payload)
            .then(() => {
            this.getBooks();
            this.$toast("Book updated!","success");
            })
            .catch((error) => {
            this.$toast("Something went wrong!","error");
            console.error(error);
            this.getBooks();
            });
      },
      removeBook(bookID) {
        const path = `items/${bookID}`;
        axios.delete(path)
            .then(() => {
                this.getBooks();
                this.$toast("Book deleted!","success");
            })
            .catch((error) => {
                this.$toast("Something went wrong!","error");
                console.error(error);
                this.getBooks();
            });
      },
      handleAddReset() {
        this.initForm();
      },
      handleAddSubmit() {
        this.toggleAddBookModal();
        const payload = {
          title: this.addBookForm.title,
          author: this.addBookForm.author,
          price: this.addBookForm.price,
        };
        this.addBook(payload);
        this.initForm();
      },
      initForm() {
        this.addBookForm.title = '';
        this.addBookForm.author = '';
        this.addBookForm.price = null;
        this.editBookForm.id = '';
        this.editBookForm.title = '';
        this.editBookForm.author = '';
        this.editBookForm.price = null;
      },
      toggleAddBookModal() {
        const body = document.querySelector('body');
        this.activeAddBookModal = !this.activeAddBookModal;
        if (this.activeAddBookModal) {
          body.classList.add('modal-open');
        } else {
          body.classList.remove('modal-open');
        }
      },
      toggleEditBookModal(book) {
        if (book) {
            this.editBookForm = book;
        }
        const body = document.querySelector('body');
        this.activeEditBookModal = !this.activeEditBookModal;
        if (this.activeEditBookModal) {
            body.classList.add('modal-open');
        } else {
            body.classList.remove('modal-open');
        }
      },
      handleEditSubmit() {
        this.toggleEditBookModal(null);
        const payload = {
            title: this.editBookForm.title,
            author: this.editBookForm.author,
            price: this.editBookForm.price,
        };
        this.updateBook(payload, this.editBookForm.id);
      },
      handleEditCancel() {
        this.toggleEditBookModal(null);
        this.initForm();
        this.getBooks();
      },
      handleDeleteBook(book) {
        this.removeBook(book.id);
      },
    },
    created() {
      this.getBooks();
    },
  };
</script>
  
<style lang="scss">
.container-fluid {
  width: 100%;
}

#box {
  a {
    cursor: pointer;
    font-size: 30px;
    font-weight: bold;
    text-decoration: none;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }

  }
}

li {
  padding: 0;
  margin: 0;
  list-style: none;
  display: inline;
  margin-right: 20px;
  text-align: start;
}

ul {
  padding-left: 0;
  margin: 0;
}

#ascending-icon {
  // height: 30px;
  height: 100%;
  width: 30px;
}

#sort-bar {
  width: 100%;
  height: 60px;
  margin-left: 0px;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  background-color: #b3e9a2;

}

.ascending-button {
  background-color: rgba(0,0,0,0);
  border: none;
  //height: 50px;
  height: 40px;
  width: 50px;
  &:hover {
    background-color: rgba(212, 126, 22, 0.171);
    cursor: pointer;
  }
}

#sort-label {
    font-size: 12px;
}

</style>