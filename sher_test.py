import json
import ast
import pprint


def category_map(categories):
    category_dict = {}
    for k, v in categories.items():
        for rt in v:
            category_dict[rt] = k
    return category_dict


if __name__ == "__main__":
    cat_file = open('categories.json')
    json_d = json.load(cat_file)
    pprint.pprint({str(k): str(v) for k, v in category_map(json_d).items()})
    print("\n json ok")
