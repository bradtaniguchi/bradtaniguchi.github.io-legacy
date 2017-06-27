
/**
 * Bradley Taniguchi
 * 5/7/17
 *
 */
(function(){
  'use strict';
  angular.module('bt', ['ui.router', 'ngMaterial']).run(config);
  config.$inject=[
    '$rootScope',
    '$transitions',
    '$mdComponentRegistry',
    '$mdSidenav'
  ];
  function config($rootScope, $transitions, $mdComponentRegistry, $mdSidenav) {
    console.log('[[bt]]');
    /*add starting configuration here*/
    $rootScope.loading = false; //show loading bar
    
    $transitions.onStart({ }, function(trans) {
      // var SpinnerService = trans.injector().get('SpinnerService');
      // SpinnerService.transitionStart();
      // trans.promise.finally(SpinnerService.transitionEnd);
      $rootScope.loading = true;
      $mdComponentRegistry.when('left-sidenav').then(function() {
          $mdSidenav('left-sidenav').close();
      });
    });
    
    $transitions.onSuccess({ }, function(trans){
      $rootScope.loading = false;
    });
    /*TODO: add navbar config*/
  }
})();

/**
 * Bradley Taniguchi
 */
(function(){
  'use strict';
  angular.module('bt')
  .config(routes);
  routes.$inject=[
    '$stateProvider',
    '$urlRouterProvider'
  ];
  function routes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/about');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/views/main/main.html',
        controller: 'MainController as vm'
      })
      .state('about', {
        parent: 'main',
        url: 'about',
        templateUrl: 'app/views/about/about.html',
        controller: 'AboutController as vm'
      })
      .state('repos', {
        parent: 'main',
        url: 'repos',
        templateUrl: 'app/views/repos/repos.html',
        controller: 'AboutController as vm'
      })
      .state('games', {
        parent: 'main',
        url:'games',
        templateUrl: 'app/views/games/games.html',
        controller: 'GamesController as vm'
      });
  }
})();

/**
 * Bradley Taniguchi
 */
(function(){
  'use strict';
  angular.module('bt')
  .config(theme);
  theme.$inject=[
    '$mdThemingProvider'
  ];
  function theme($mdThemingProvider) {
    $mdThemingProvider.definePalette('bradsPalette', {
      '50': 'e8f5f8',
      '100': 'c5e5ee',
      '200': '9ed4e3',
      '300': '77c2d7',
      '400': '5ab5cf',
      '500': '3da8c6',
      '600': '37a0c0',
      '700': '2f97b9',
      '800': '278db1',
      '900': '1a7da4',
      'A100': 'daf4ff',
      'A200': 'a7e4ff',
      'A400': '74d4ff',
      'A700': '5bccff',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': [
        '50',
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        'A100',
        'A200',
        'A400',
        'A700'
      ],
      'contrastLightColors': [
        '700',
        '800',
        '900'
      ]
    });
    $mdThemingProvider.definePalette('bradsPaletteAlert', {
      '50': 'f8eae8',
      '100': 'eecac5',
      '200': 'e3a79e',
      '300': 'd78477',
      '400': 'cf695a',
      '500': 'c64f3d',
      '600': 'c04837',
      '700': 'b93f2f',
      '800': 'b13627',
      '900': 'a4261a',
      'A100': 'ffddda',
      'A200': 'ffaea7',
      'A400': 'ff7e74',
      'A700': 'ff675b',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': [
        '50',
        '100',
        '200',
        '300',
        '400',
        'A100',
        'A200',
        'A400',
        'A700'
      ],
      'contrastLightColors': [
        '500',
        '600',
        '700',
        '800',
        '900'
      ]
    });

    $mdThemingProvider.theme('theme')
    .primaryPalette('bradsPalette')
    .accentPalette('bradsPaletteAlert');

    $mdThemingProvider.setDefaultTheme('theme');
  }
})();

/**
 * Bradley Taniguchi
 * 
 * 
 * TODO: determine how I am going to save/keep track of games
 * using Phaser or Unity? Will I use an Iframe or just a seperate page?
 */
(function(){
  'use strict';
  var gameComp = {
    templateUrl: 'app/components/game-comp/game-comp.html',
    controller: 'GameCompController as vm',
    bindings: {
      game: '<'
    }
  }
  angular.module('bt')
  .component('gameComp', gameComp)
  .controller('GameCompController', GameCompController);
  GameCompController.$inject=[
    '$log'
  ];
  function GameCompController($log) {
    var vm = this;
    vm.$onInit = onInit;
    return vm;
    
    function onInit() {
      if(vm.game === undefined) {
        $log.error('GameComp: vm.game is undefined!');
      }
    }
  }
})();
/**
 * Bradley Taniguchi
 */
(function(){
  'use strict';
  angular.module('bt')
  .controller('ReportBugController', ReportBugController);
  ReportBugController.$inject=[
    '$log',
    '$mdDialog'
  ];
  function ReportBugController($log, $mdDialog) {
    var vm = this;
    vm.message = {};
    vm.close = close;
    vm.submit = submit;
    return vm;
    
    function close() {
      $mdDialog.cancel();
    }
    
    function submit(message) {
      $log.log(message);
      $mdDialog.hide(message);
    }
  }
})();
(function(){
  'use strict';
  angular.module('bt')
  .controller('AboutController', AboutController);
  AboutController.$inject=[
    '$log',
    'aboutTiles',
    '$mdDialog',
    '$mdToast'
  ];
  function AboutController($log, aboutTiles, $mdDialog, $mdToast) {
    var vm = this;
    vm.tiles = aboutTiles;
    vm.$onInit = onInit;
    vm.report = report;
    return vm;
    /*function defintions*/
    function onInit() {
      $log.debug('In About');
    }
    function report(ev) {
      $mdDialog.show({
        templateUrl: 'app/dialogs/reportBug/reportBug.html',
        controller: 'ReportBugController as vm',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
      }).then(function(){
        $mdToast.show('Sent report!');
      }).catch(function(err){
        if(err !==undefined) {$log.error(err);}
      });
    }
  }
})();
(function(){
  'use strict';
  angular.module('bt')
  .constant('aboutTiles', [
    {
      templateUrl: '',
      height: 1,
      width: 1
    },
    {
      templateUrl: '',
      height: 2,
      width: 3
    }
  ]);
})();
/**
 * Bradley Taniguchi
 */
(function(){
  'use strict';
  angular.module('bt')
  .controller('GamesController', GamesController);
  GamesController.$inject=[
    '$log',
    '$mdToast'
  ];
  function GamesController($log, $mdToast) {
    var vm = this;
    vm.games = [
      {
        title: 'LastLunarLander',
        description: 'A unity3d game made for CTC495.'
      }
    ];
    vm.$onInit = onInit;
    return vm;
    
    function onInit() {
      $mdToast.showSimple('No Games exist yet');
    }
  }
})();
/**
 * Bradley Taniguchi
 */
(function(){
  'use strict';
  angular.module('bt')
  .controller('MainController', MainController);
  MainController.$inject=[
    '$log',
    '$state',
    '$mdSidenav',
    '$window',
    '$mdDialog',
    'navbarApps'
  ];
  function MainController($log, $state, $mdSidenav, $window, $mdDialog, navbarApps) {
    var vm = this;
    vm.toggleNav = toggleNav;
    vm.redirectToPage = redirectToPage;
    vm.apps = navbarApps;
    vm.go = go;
    return vm;

    function toggleNav() {
      $log.debug('toggle nav');
      $mdSidenav('left-sidenav').toggle();
    }

    function redirectToPage(ev) {
      var gitPage = "https://github.com/bradtaniguchi";
      var dialog = $mdDialog.confirm()
        .title('Redirect To Github')
        .textContent('This will redirect you my github profile is that ok?')
        // .ariaLabel("")
        .targetEvent(ev)
        .ok('Yes')
        .cancel('No');

      $mdDialog.show(dialog).then(function(){
        $window.location = gitPage;
      }, function(){
        $log.debug('Canceled');
      });
    }
    function go(state) {
      $log.debug(state);
      $state.go(state);
    }
  }
})();

(function(){
  'use strict';
  angular.module('bt')
  .constant('navbarApps', [
    {
      icon: 'home',
      name: 'About',
      state: 'about',
    },
    {
      icon: 'library_books',
      name: 'Repositories',
      state: 'repos'
    },
    {
      icon: 'videogame_asset',
      name: 'Games',
      state: 'games'
    }
    ]);
})();
/**
 * Bradley Taniguchi
 * 6/6/17
 */
(function(){
  'use strict';
  angular.module('bt')
  .controller('ReposController', ReposController);
  ReposController.$inject=[
    '$log'
    ];
  function ReposController($log) {
    var vm = this;
    return vm;
  }
})();