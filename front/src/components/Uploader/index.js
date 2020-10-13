import React, { useRef } from 'react';
import ImageUploading from 'react-images-uploading';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import 'react-image-crop/dist/ReactCrop.css';
import MuiAlert from '@material-ui/lab/Alert';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import api from "../../services/api";


const useStyles = makeStyles((theme) => ({

    media: {
        height: 300,
    },
    button: {
        marginBottom: 20
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const Uploader = props => {
    const classes = useStyles();
    const [images, setImages] = React.useState([]);

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;

        cropper.getCroppedCanvas().toBlob((blob) => {
            const formData = new FormData();

            formData.append('foto', blob, 'foto.png');

            api.post(`/api/pet/${props.pet}/upload/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(response => {
                    props.success();
                })
                .catch(function () {
                    console.log("FAILURE!!");
                });

        });

        setOpen(false);
    };

    const onChange = (imageList, addUpdateIndex) => {

        handleClickOpen();
        setImages(imageList);
    };

    const cropperRef = useRef(null);
    const onCrop = () => {

    };

    return (
        <div className="App">
            <ImageUploading
                value={images}
                onChange={onChange}
                maxNumber={1}
                dataURLKey="data_url"
                resolutionType="more"
                resolutionWidth={400}
                resolutionHeight={300}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                    errors
                }) => (
                        // write your building UI
                        <div>
                            <Button
                                className={classes.button}
                                fullWidth
                                color="secondary"
                                variant="contained"
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Carregar Nova Foto
                            </Button>

                            {errors && <Alert severity="error">
                                {errors.maxNumber && <span>Numero de imagens maior que o permitido!</span>}
                                {errors.acceptType && <span>Você selecionou um tipo de arquivo não permitido!</span>}
                                {errors.maxFileSize && <span>Arquivo selecionado excede o máximo permitido</span>}
                                {errors.resolution && <span>Resolução não permitida</span>}
                            </Alert>}
                            <Dialog
                                fullScreen={fullScreen}
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <DialogTitle id="responsive-dialog-title">{"Salvar Imagem?"}</DialogTitle>
                                <DialogContent>
                                    {imageList.map((image, index) => (
                                        <Card key={index} className={classes.root}>
                                            <CardActionArea>

                                                <Cropper
                                                    src={image['data_url']}
                                                    style={{ height: 300, width: "100%" }}
                                                    // Cropper.js options
                                                    initialAspectRatio={4 / 3}
                                                    guides={true}
                                                    crop={onCrop}
                                                    ref={cropperRef}
                                                />
                                            </CardActionArea>
                                        </Card>

                                    ))}

                                </DialogContent>
                                <DialogActions>
                                    <Button autoFocus onClick={() => { onImageRemove(0); handleClose(); }} color="primary">
                                        Cancelar
                                    </Button>
                                    <Button onClick={handleClose} color="primary" autoFocus>
                                        Salvar
                                    </Button>
                                </DialogActions>
                            </Dialog>

                        </div>
                    )}
            </ImageUploading>

        </div >
    );
}

export default Uploader;