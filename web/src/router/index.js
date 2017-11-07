import Vue from 'vue';
import Router from 'vue-router';
import Navbar from '../components/Navbar';
import PlayerList from '../components/PlayerList';
import PlayerPage from '../components/PlayerPage';
import Footer from '../components/Footer';
import Welcome from '../components/Welcome';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      components: {
        navbar: Navbar,
        container: PlayerList,
        footer: Footer,
        welcome: Welcome,
      },
    },
    {
      path: '/player/:uuid',
      components: {
        navbar: Navbar,
        container: PlayerPage,
        footer: Footer,
      },
    },
  ],
});