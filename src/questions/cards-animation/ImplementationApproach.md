# Though behind implementation

the only logic is to use 2 things :
Put this logic : style={{ animationDelay: `${index * 0.2}s` }}

initially set opacity for each .item as opacity : 0


later we need to set animation and keyframes

.item {
     animation: 0.5s card ease forwards;
}

@keyframes card {
  from {
    transform: translate(-300px, -300px);
  }

  to {
    transform: translate(0, 0);
    opacity: 1;
  }
}

