<template>
	<div class="home">
		<div class="hero is-fullheight is-bold has-text-centered">
			<div class="hero-body">
				<div class="container">
					<div class="columns is-vcentered">
						<div class="column is-8 is-offset-2">
							<h1 class="title is-1 is-size-2-mobile is-spaced">Hello. I'm Shirley, and this is my stuff.</h1>
							<h2 class="subtitle is-3 is-size-4-mobile">These items are for sale.<br>Cash only. Priced to go, based on Amazon and ebay. If you want a different price, let me know and we can talk.</h2>
							<h2 class="subtitle is-3 is-size-4-mobile">We can meet outside the<br><a href="https://goo.gl/maps/qaghmjfJB5u" class="has-text-grey-lighter">Mountain Brook Police Department</a>. or the <a href="https://goo.gl/maps/coMRKQbmi7A2" class="has-text-grey-lighter">Crestline Post Office</a>.</h2>
							<h2 class="subtitle is-3 is-size-4-mobile">Take a look around. Add the things you like to your cart, and we will find a good time to meet.</h2>
						</div>
					</div>
				</div>
				<div class="continue is-hidden-touch" @click="scroll">
					<font-awesome-icon icon="chevron-down" size="3x" />
				</div>
				<div class="icons is-flex">
					<router-link to="/cart">
						CART
					</router-link>
					<router-link to="/login" v-if="!user">
						SIGN IN
					</router-link>
					<router-link to="/dashboard" v-if="user">
						DASHBOARD
					</router-link>
					<router-link to="/add-item" v-if="user">
						ADD ITEM
					</router-link>

				</div>
			</div>
		</div>
		<section class="cards container">
			<div class="columns is-multiline">
				<div v-for="item of items"
					:key="item.id"
					class="column is-one-quarter-desktop">
					<router-link :to="'/i/' + item.id">
						<div class="card">
							<div class="card-image">
								<figure class="image">
									<img v-if="item.pictures && item.pictures.length > 0"
									:src="item.pictures[0].src"
									:alt="item.name">
									<img src="https://fakeimg.pl/300x200/"
									v-else>
								</figure>
							</div>
							<div class="card-content">
								<p class="title is-4">{{ item.name }}</p>
								<p>{{ item.description }}</p>
								<p>{{ item.price | currency}}</p>
							</div>
						</div>
					</router-link>
				</div>
			</div>
		</section>
	</div>
</template> 

<script>
import db from "../db";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

export default {
	name: "Home",

	firestore: {
		items: db.collection('items')
	},

	data() {
		return {
			items: [],
			user: null,
		};
	},

	created() {
		firebase.auth().onAuthStateChanged(user => {
			this.user = user;
		});
	},

	methods: {
		scroll() {
			window.scrollTo({
				'top' : document.querySelector('.cards').offsetTop,
				'behavior': 'smooth'
			});
		},
		onUserClick() {
			if (this.user) {
				this.$router.push('/dashboard');
			}else{
				this.$router.push('/login');
			}
		}
	}
}
</script>

<style lang="scss">
.cards {
	padding: 20px;
}
.card {
  cursor: pointer;
}
.card:hover {
  box-shadow: 0px 2px 11px rgba(10, 10, 10, 0.1);
}
.has-margin-bottom {
	margin-bottom: 1.5rem;
}
.home .hero {
	position: relative;
	padding-top: 52px;
	padding-bottom: 48px;
	background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/img/140963-min.jpeg');
	background-size: cover;
	.title {
		font-family: 'Playfair Display', serif;
		font-style: italic;
		font-size: 72px;
	}
	.title, .subtitle {
		color: white;
		a {
			// color: hsl(0, 0%, 96%);
			// @extend .has-text-grey-lighter;
			// text-decoration: underline;
		}
	}
	.subtitle {
		font-family: 'Chivo', sans-serif;
	}
}
.continue {
	cursor: pointer;
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	color: rgba(255, 255, 255, 0.9);
}
.icons {
	position: absolute;
	top: 20px;
	right: 20px;
	font-family: 'Playfair Display', serif;
	font-style: italic;

	a {
		color: rgba(255, 255, 255, 0.9);
		padding: 0 1rem;
	}
}
</style>
