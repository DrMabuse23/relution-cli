require("babel/polyfill");
import Tower from './commands/tower';
import StartTree from './components/StartTree';
import RelutionCli from './helper/relution';

export default class Cli{
  constructor(opts){
    let self = this;
    this.helper = new RelutionCli();
    this.tower = new Tower();
    this.opts = opts.argv;
    this.commands = null;
    this.run();
  }

  run(){
    var self = this;
    var start = new StartTree();
    return this.helper.getProjectType().then(() => {
      self.commands = self.tower.getCommandsByType(self.helper.projectType);
      var flat = self.tower.getStartCommands(self.commands);
      return self.tower.showCommands('Start', 'Please choose Your Command', flat);
    });
  }

}
