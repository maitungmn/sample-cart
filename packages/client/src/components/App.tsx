import React from 'react';
import {
  Box, Button, Card, CardActions, CardContent, CardMedia, Grid, makeStyles, Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

function App() {
  const classes = useStyles();

  return (
    <>
      <div className="header">
        <Box
          display="flex"
          alignItems="center"
        >
          <img src="img/logo.png" alt="trillo" className="logo" />
          <h2>Sample Cart</h2>
        </Box>

        <nav className="user-nav">
          <div className="user-nav__icon-box">
            <svg className="user-nav__icon">
              <use xlinkHref="img/shopping-cart.svg#Capa_1" />
            </svg>
            <span className="user-nav__notification">7</span>
          </div>
          <div className="user-nav__user">
            <img src="https://randomuser.me/api/portraits/women/90.jpg" alt="User" className="user-nav__user-photo" />
            <span className="user-nav__user-name">Guest</span>
          </div>
        </nav>
      </div>

      <div className="content">
        <nav className="sidebar">
          <ul className="side-nav">
            <li className="side-nav__item side-nav__item--active">
              <a href="/cate1" className="side-nav__link">
                <span>Cate 1</span>
              </a>
            </li>
            <li className="side-nav__item">
              <a href="/cate2" className="side-nav__link">
                <svg className="side-nav__icon">
                  <use xlinkHref="img/sprite.svg#icon-aircraft-take-off" />
                </svg>
                <span>Flight</span>
              </a>
            </li>
          </ul>
        </nav>

        <main className="product-view">
          <Box className="overview">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardMedia
                    className={classes.media}
                    image="https://source.unsplash.com/random/300x300"
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Word of the Day
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Add to cart</Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardMedia
                    className={classes.media}
                    image="https://source.unsplash.com/random/300x300"
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Word of the Day
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Add to cart</Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardMedia
                    className={classes.media}
                    image="https://source.unsplash.com/random/300x300"
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Word of the Day
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Add to cart</Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardMedia
                    className={classes.media}
                    image="https://source.unsplash.com/random/300x300"
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Word of the Day
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Add to cart</Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardMedia
                    className={classes.media}
                    image="https://source.unsplash.com/random/300x300"
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Word of the Day
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Add to cart</Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardMedia
                    className={classes.media}
                    image="https://source.unsplash.com/random/300x300"
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Word of the Day
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Add to cart</Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardMedia
                    className={classes.media}
                    image="https://source.unsplash.com/random/300x300"
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Word of the Day
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Add to cart</Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardMedia
                    className={classes.media}
                    image="https://source.unsplash.com/random/300x300"
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Word of the Day
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Add to cart</Button>
                  </CardActions>
                </Card>
              </Grid>

            </Grid>
          </Box>
        </main>
      </div>
    </>
  );
}

export default App;
