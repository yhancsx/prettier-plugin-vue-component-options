# Usage

## Prettier Options

```json
{
  "optionOrders": [...]
}
```

## Before

```js
export default {
  beforeCreate: {},
  created: {},
  model: {},
  props: {},
  watch: {},
  updated: {},
  data: {},
  apollo: {},
  computed: {},
  methods: {},
  beforeDestroy: {},
  destroyed: {},
  title: {},
  $_veeValidate: {},
  inject: {},
  filters: {},
  mixins: {},
  name: {},
  mounted: {},
  beforeRouteLeave: {},
  components: {},
  directives: {},
};
```

## After

```js
export default {
  name: {},
  title: {},
  $_veeValidate: {},
  inject: {},
  mixins: {},
  components: {},
  directives: {},
  filters: {},
  model: {},
  props: {},
  data: {},
  apollo: {},
  computed: {},
  methods: {},
  watch: {},
  beforeCreate: {},
  created: {},
  updated: {},
  mounted: {},
  beforeDestroy: {},
  destroyed: {},
  beforeRouteLeave: {},
};
```

# 배포

```
npm version patch
npm login --registry=http://registry.navercorp.com/api/npm/npm-naver/
npm publish # 에러나는 경우 버전 확인
```
