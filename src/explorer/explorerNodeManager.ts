import { Disposable } from "vscode";
import i18n from "../i18n";
import { Category, IToolData, PanelType } from "../shared";
import { DevToysNode } from "./DevToysNode";

class ExplorerNodeManager implements Disposable {
  private explorerNodeMap: Map<Category, DevToysNode[]> = new Map<
    Category,
    DevToysNode[]
  >();

  initialize(): void {
    const coders: IToolData[] = [
      {
        label: i18n.t("view.devtoys.coders.base64.label"),
        tooltip: i18n.t("view.devtoys.coders.base64.tooltip"),
        panel: PanelType.base64,
      },
      {
        label: i18n.t("view.devtoys.coders.html.label"),
        tooltip: i18n.t("view.devtoys.coders.html.tooltip"),
        panel: PanelType.html,
      },
      {
        label: i18n.t("view.devtoys.coders.url.label"),
        tooltip: i18n.t("view.devtoys.coders.url.tooltip"),
        panel: PanelType.url,
      },
    ];
    const convertors: IToolData[] = [
      {
        label: i18n.t("view.devtoys.convertors.jsonToYaml.label"),
        tooltip: i18n.t("view.devtoys.convertors.jsonToYaml.tooltip"),
        panel: PanelType.jsonToYaml,
      },
      {
        label: i18n.t("view.devtoys.convertors.numberBase.label"),
        tooltip: i18n.t("view.devtoys.convertors.numberBase.tooltip"),
        panel: PanelType.numberBase,
      },
    ];

    const generators: IToolData[] = [
      {
        label: i18n.t("view.devtoys.generators.uuid.label"),
        tooltip: i18n.t("view.devtoys.generators.uuid.tooltip"),
        panel: PanelType.uuid,
      },
      {
        label: i18n.t("view.devtoys.generators.hash.label"),
        tooltip: i18n.t("view.devtoys.generators.hash.tooltip"),
        panel: PanelType.hash,
      },
    ];

    const text: IToolData[] = [
      {
        label: i18n.t("view.devtoys.text.regexTester.label"),
        tooltip: i18n.t("view.devtoys.text.regexTester.tooltip"),
        panel: PanelType.regexTester,
      },
    ];

    const graphic: IToolData[] = [
      {
        label: i18n.t("view.devtoys.graphic.colorBlindnessSimulator.label"),
        tooltip: i18n.t("view.devtoys.graphic.colorBlindnessSimulator.tooltip"),
        panel: PanelType.colorBlindnessSimulator,
      },
    ];

    const others: IToolData[] = [];

    this.explorerNodeMap.set(
      Category.coders,
      coders.map((item) => new DevToysNode(item, true))
    );
    this.explorerNodeMap.set(
      Category.convertors,
      convertors.map((item) => new DevToysNode(item, true))
    );
    this.explorerNodeMap.set(
      Category.generators,
      generators.map((item) => new DevToysNode(item, true))
    );
    this.explorerNodeMap.set(
      Category.text,
      text.map((item) => new DevToysNode(item, true))
    );
    this.explorerNodeMap.set(
      Category.graphic,
      graphic.map((item) => new DevToysNode(item, true))
    );
    this.explorerNodeMap.set(
      Category.others,
      others.map((item) => new DevToysNode(item, true))
    );
  }

  public getRootNodes(): DevToysNode[] {
    return [
      new DevToysNode(
        {
          label: i18n.t("view.devtoys.all.label"),
          tooltip: i18n.t("view.devtoys.all.tooltip"),
          panel: Category.all,
        },
        false
      ),
      new DevToysNode(
        {
          label: i18n.t("view.devtoys.convertors.label"),
          tooltip: i18n.t("view.devtoys.convertors.tooltip"),
          panel: Category.convertors,
        },
        false
      ),
      new DevToysNode(
        {
          label: i18n.t("view.devtoys.coders.label"),
          tooltip: i18n.t("view.devtoys.coders.tooltip"),
          panel: Category.coders,
        },
        false
      ),
      new DevToysNode(
        {
          label: i18n.t("view.devtoys.generators.label"),
          tooltip: i18n.t("view.devtoys.generators.tooltip"),
          panel: Category.generators,
        },
        false
      ),
      new DevToysNode(
        {
          label: i18n.t("view.devtoys.text.label"),
          tooltip: i18n.t("view.devtoys.text.tooltip"),
          panel: Category.text,
        },
        false
      ),
      new DevToysNode(
        {
          label: i18n.t("view.devtoys.graphic.label"),
          tooltip: i18n.t("view.devtoys.graphic.tooltip"),
          panel: Category.graphic,
        },
        false
      ),
      new DevToysNode(
        {
          label: i18n.t("view.devtoys.others.label"),
          tooltip: i18n.t("view.devtoys.others.tooltip"),
          panel: Category.others,
        },
        false
      ),
    ];
  }

  public getAllNodes(): DevToysNode[] {
    return Array.from(this.explorerNodeMap.values()).flat();
  }
  public getConvertorsNodes(): DevToysNode[] {
    return this.explorerNodeMap.get(Category.convertors) || [];
  }
  public getCodersNodes(): DevToysNode[] {
    return this.explorerNodeMap.get(Category.coders) || [];
  }
  public getGeneratorsNodes(): DevToysNode[] {
    return this.explorerNodeMap.get(Category.generators) || [];
  }
  public getTextNodes(): DevToysNode[] {
    return this.explorerNodeMap.get(Category.text) || [];
  }
  public getGraphicNodes(): DevToysNode[] {
    return this.explorerNodeMap.get(Category.generators) || [];
  }
  public getOthersNodes(): DevToysNode[] {
    return this.explorerNodeMap.get(Category.others) || [];
  }

  public dispose(): void {
    this.explorerNodeMap.clear();
  }
}

export const explorerNodeManager: ExplorerNodeManager =
  new ExplorerNodeManager();