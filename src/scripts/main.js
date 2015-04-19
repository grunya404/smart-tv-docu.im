Keys = {
    13: 'enter',
    33: 'pageup',
    34: 'pagedown',
    35: 'end',
    36: 'home',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

Main = {
    SCENE_GRID_ID: 'grid_scene',
    SCENE_INFO_ID: 'info_scene',
    resource: null,
    scenes: {},
    activeScene: undefined,

    bodyLoadHandler: function() {
        document.body.addEventListener('keydown', Main.keyDownHandler, false);
        document.body.addEventListener('click', Main.clickHandler, false );

        var gridScene = new Grid(Grid.BY_ROW, 5);
        this.activateScene(Main.SCENE_GRID_ID);
        this.scenes[this.SCENE_GRID_ID] = gridScene;
        this.resource = Docuim;
        this.resource.itemsListSuccessHandler = gridScene.renderList;
        var username = Settings.getDIUsername();
        var password = Settings.getDIPassword();
        this.resource.loginAndGetItemsList(username, password);

        var infoScene = new Info();
        this.scenes[this.SCENE_INFO_ID] = infoScene;
        this.resource.infoSuccessHandler = infoScene.renderInfo;
    },

    getScene: function(sceneId) {
        sceneId = sceneId || Main.activeScene;
        if (Main.scenes[sceneId] != undefined) {
            return Main.scenes[sceneId];
        }
        return false;
    },

    activateScene: function(sceneId) {
        var scene,
            scenes = document.getElementsByClassName('scene');
        for (var s = 0; s < scenes.length; s++) {
            scene = scenes[s];
            if (scene.id == sceneId) {
                scene.style.display = 'block';
                Main.activeScene = sceneId;
            } else {
                scene.style.display = 'none';
            }
        }

    },

    showTintWithSpinner: function() {
        alert('tint shown');
        alert('spinner shown');
    },

    hideTint: function() {
        alert('tint hidden');
    },

    keyDownHandler: function(keyEvent) {
        if (keyEvent.metaKey == true) {
            return true;
        }
        var handlerName = (Keys[keyEvent.keyCode] || 'default') + 'Handler';
        var activeScene = Main.getScene();
        if (handlerName in activeScene) {
            activeScene[handlerName](keyEvent);
        } else if (Main.hasOwnProperty(handlerName)) {
            Main[handlerName](keyEvent);
        } else {
            return false;
        }
    },

    clickHandler: function(clickEvent) {
        console.dir(clickEvent);
    },

    errorHandler: function(msg) {
        alert(msg);
    }
};