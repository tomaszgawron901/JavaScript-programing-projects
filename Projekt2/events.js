// File section
newCanvasBTN.addEventListener('click', ()=>{currentPhotoShop.newCanvas(parseInt(widthInput.value), parseInt(heightInput.value))})
fileBTN.addEventListener('click', function(){open_close(document.getElementById("file"))})
openImageBTN.addEventListener('click', ()=>{
    openImageInput.value = ""
    openImageInput.click()})
openImageInput.addEventListener('change', (e)=>{currentPhotoShop.openImage(e)})
clearCanvasBTN.addEventListener('click', ()=>{currentPhotoShop.newCanvas(currentPhotoShop.myCanvas.clientWidth, currentPhotoShop.myCanvas.clientHeight)})


// Brush section
brushBTN.addEventListener('click', function(){open_close(document.getElementById("brush"))})
    // Color section
colorBTN.addEventListener('click', function(){open_close(document.getElementById("color"))})
colorInput.addEventListener("change", ()=>{
    Brush.brushColor = HEX_to_RGB(colorInput.value, opacityInput.value)
    opacityInput.style.background = "linear-gradient(0.25turn, rgba(0, 0, 0, 0),"+ 
    "rgb("+ Brush.brushColor[0] +", " +Brush.brushColor[1]+", "+Brush.brushColor[2]+"))";
    if(currentPhotoShop.currentBrush != null)
        currentPhotoShop.currentBrush.color = Brush.brushColor
    })
opacityInput.addEventListener("change", ()=>{Brush.brushColor = HEX_to_RGB(colorInput.value, opacityInput.value)
    if(currentPhotoShop.currentBrush != null)
        currentPhotoShop.currentBrush.color = Brush.brushColor
    })
    // Shape section
shapeBTN.addEventListener('click', ()=>{{open_close(document.getElementById("shape"))}})
sizeSlider.addEventListener('input', (e)=>{
    let maxValue = parseInt(e.target.max)
    let currentValue = parseInt(e.target.value)  
    sizeInput.value = currentValue
    if(currentValue >= maxValue)
    {
        newMax = sizeSlider.max*1.01
        if(newMax>1000)
        {
            newMax=1000
        }
        sizeSlider.max = newMax
    }else
    {
        newMax = sizeSlider.max*0.9
        if(newMax<100)
        {
            newMax =100
        }
        sizeSlider.max = newMax
    }
    Brush.brushSize = parseInt(sizeInput.value)
    if(currentPhotoShop.currentBrush != null)
    {
        currentPhotoShop.currentBrush.size = Brush.brushSize
    }
})
sizeInput.addEventListener('input', (e)=>{
    let currentValue = parseInt(e.target.value)
    if(currentValue <1 || isNaN(currentValue))
    {
        currentValue = 1
        sizeInput.value = 1
    }
    sizeSlider.value = currentValue
    Brush.brushSize = parseInt(sizeInput.value)
    if(currentPhotoShop.currentBrush != null)
    {
        currentPhotoShop.currentBrush.size = Brush.brushSize
    }
})
selectBrush.addEventListener('change', (e)=>{
    switch(e.target.value)
    {
        case "null":
            currentPhotoShop.currentBrush = null
            break
        case "inker":
            currentPhotoShop.currentBrush = new Inker(Brush.brushSize, Brush.brushColor, currentPhotoShop.ctx)
            break
    }
})


// Modifications section
modificationsBTN.addEventListener('click', function(){open_close(document.getElementById("modifications"))})
saturationBTN.addEventListener('click', function(){open_close(document.getElementById("saturation"))})
    //Saturation section
redSaturationInput.addEventListener('input', (e)=>{
    if(currentPhotoShop.currentModification == null)
    {
        currentPhotoShop.currentModification = new Saturation(currentPhotoShop.ctx)
        currentPhotoShop.currentModification.start(currentPhotoShop.copyCanvasData())
    }
    currentPhotoShop.currentModification.red = parseFloat(e.target.value)
    currentPhotoShop.currentModification.demo()
    
})
greenSaturationInput.addEventListener('input', (e)=>{
    if(currentPhotoShop.currentModification == null)
    {
        currentPhotoShop.currentModification = new Saturation(currentPhotoShop.ctx)
        currentPhotoShop.currentModification.start(currentPhotoShop.copyCanvasData())
    }
    currentPhotoShop.currentModification.green = parseFloat(e.target.value)
    currentPhotoShop.currentModification.demo()
})
blueSaturationInput.addEventListener('input', (e)=>{
    if(currentPhotoShop.currentModification == null)
    {
        currentPhotoShop.currentModification = new Saturation(currentPhotoShop.ctx)
        currentPhotoShop.currentModification.start(currentPhotoShop.copyCanvasData())
    }
    currentPhotoShop.currentModification.blue = parseFloat(e.target.value)
    currentPhotoShop.currentModification.demo()
})
cancelModificationsBTN.addEventListener('click', ()=>{
    currentPhotoShop.cancelModification()
})
applyModificationsBTN.addEventListener('click', ()=>{
    currentPhotoShop.applyModification()
})
    // Brightness section
brightnessBTN.addEventListener('click',()=>{open_close(document.getElementById("brightness"))})




// Mouse section

workSpace.addEventListener("mousedown", (e)=>{
    currentPhotoShop.cancelModification()
    if(currentPhotoShop.currentBrush != null)
    {
        
        Brush.painting = true
        let x = e.target.offsetLeft-currentPhotoShop.myCanvas.offsetLeft+e.layerX+e.target.scrollTop
        let y = e.target.offsetTop-currentPhotoShop.myCanvas.offsetTop+e.layerY+e.target.scrollLeft
        currentPhotoShop.currentBrush.start(currentPhotoShop.copyCanvasData())
        currentPhotoShop.currentBrush.addPoint({
            x: x,
            y: y
        })
        currentPhotoShop.currentBrush.paint()
    }
})

window.addEventListener('mouseup', ()=>{
    
    if(currentPhotoShop.currentBrush != null)
    {
        Brush.painting = false
        currentPhotoShop.currentBrush.stop()
    }
})
workSpace.addEventListener('mousemove', (e)=>{
    
    if(currentPhotoShop.currentBrush != null && Brush.painting)
    {

        let x = e.target.offsetLeft-currentPhotoShop.myCanvas.offsetLeft+e.offsetX+e.target.scrollLeft
        let y = e.target.offsetTop-currentPhotoShop.myCanvas.offsetTop+e.offsetY+e.target.scrollTop
        currentPhotoShop.currentBrush.addPoint({
            x: x,
            y: y
        })
        currentPhotoShop.currentBrush.paint()
    }
})




