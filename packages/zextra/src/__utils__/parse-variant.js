const style_from_variant = (variant, color) => {
    switch(variant){
        case 'contained' : return {
            color : 'white',
            background : color
        }
        case 'outlined' : return {
            color, 
            background : transparent,
            border : `2px soid ${color}`
        }
        case 'soft' : return {
            
        }
    }
}