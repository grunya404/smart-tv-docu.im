Grid = function(format, itemsPerGroup) {
    this.BY_ROW = 1;
    this.BY_COLUMN = 2;
    this.currentFormat = format;
    this.itemsPerGroup = itemsPerGroup;
    return this;
};

Grid.prototype.renderList = function(list) {
    var gridItem, gridItemText, item,
        itemContainer = document.getElementById('grid_item_container');
    for (var i = 0; i < list.items.length; i++) {
        item = list.items[i];
        gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.dataset.id = item.id;
        gridItemText = document.createTextNode(item.id);
        gridItem.appendChild(gridItemText);
        gridItem.tabIndex = -1;
        itemContainer.appendChild(gridItem);
    }
    console.dir(list);
};

Grid.prototype.enterHandler = function(keyEvent) {
    if (keyEvent.srcElement.classList.contains('grid-item')
        && keyEvent.srcElement.dataset['id'] != undefined
    ) {
        var infoScene = Main.getScene(Main.SCENE_INFO_ID);
        infoScene.loadAndRenderInfo(keyEvent.srcElement.dataset['id']);
    }
};